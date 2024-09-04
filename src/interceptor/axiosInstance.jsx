import axios from 'axios';
import store from '../componant/store/store'; // Import the store directly
import { setTokens } from '../componant/slices/authSlice';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

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
                console.log('Refresh token from the store: ', refreshToken);
                
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

                    // Update tokens
                    store.dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    console.log('Retry original request after refreshing token:', originalRequest);
                    
                    return axiosInstance(originalRequest);
                }
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;