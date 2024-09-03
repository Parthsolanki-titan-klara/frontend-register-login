import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import store from '../componant/store/store'; // Import the store directly
import { setTokens } from '../componant/slices/authSlice';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});
let refreshTokenTimeout;

const scheduleRefreshToken = (expiresIn) => {
    const state = store.getState();
    const refreshToken = state.auth.refreshToken;

    if (refreshTokenTimeout) {
        clearTimeout(refreshTokenTimeout);
    }
    refreshTokenTimeout = setTimeout(async () => {
        try {
            const refreshTokenUrl = `${import.meta.env.VITE_API_BASE_URL}/refresh-token`;
            const refreshTokenResponse = await axios.post(refreshTokenUrl, {}, {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`,
                },
                withCredentials: true,
            });

            console.log('Refresh token response in schedule RefreshToken:', refreshTokenResponse);

            if (refreshTokenResponse.status === 200) {
                const newAccessToken = refreshTokenResponse.data.accessToken;
                const newRefreshToken = refreshTokenResponse.data.refreshToken;
                const expiresIn = refreshTokenResponse.data.expiresIn;

                // Update tokens
                store.dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                // Schedule the next refresh
                scheduleRefreshToken(expiresIn);
            }
        } catch (error) {
            console.error('Failed to refresh token:', error);
        }
    }, (expiresIn - 60) * 1000); // Refresh 1 minute before expiration
};

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        console.log('Error in axiosInstance:', error);

        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log('Refreshing token... while 401 error');

            originalRequest._retry = true;
            try {
                const state = store.getState();
                const refreshToken = state.auth.refreshToken;
                const refreshTokenUrl = `${import.meta.env.VITE_API_BASE_URL}/refresh-token`;
                const refreshTokenResponse = await axios.post(refreshTokenUrl, {}, {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`,
                    },
                    withCredentials: true,
                });

                console.log('Refresh token response:', refreshTokenResponse);

                if (refreshTokenResponse.status === 200) {
                    const newAccessToken = refreshTokenResponse.data.accessToken;
                    const newRefreshToken = refreshTokenResponse.data.refreshToken;
                    const expiresIn = refreshTokenResponse.data.expiresIn;

                    // Update tokens
                    store.dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // Schedule the next refresh
                    scheduleRefreshToken(expiresIn);

                    return axiosInstance(originalRequest);
                }
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

// Initial token scheduling
const state = store.getState();
const refreshToken = state.auth.refreshToken;
if (refreshToken) {
    const initialExpiresIn = jwtDecode(refreshToken).exp;
    scheduleRefreshToken(initialExpiresIn);
}

export default axiosInstance;