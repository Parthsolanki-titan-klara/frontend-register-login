import axios from 'axios';
import store from '../componant/store/store'; // Import the store directly
import { clearTokens, setTokens } from '../componant/slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        console.log('Error in axiosInstance:', error);
        const specialUrl = '/allusers';
        const originalRequest = error.config;
        console.log("Error code : ", error.response.status);

        if (error.response.status === 401 && !originalRequest._retry && originalRequest.url.includes(specialUrl)) {
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

                const newAccessToken = refreshTokenResponse.data.accessToken;
                const newRefreshToken = refreshTokenResponse.data.refreshToken;
                // Update tokens
                store.dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                console.log('Retry original request after refreshing token:', originalRequest);

                return axiosInstance(originalRequest);
            } catch (err) {
                // console.log('Error in refreshing token:', err);
                // Clear the Redux store and redirect to the login page
                console.log('Error in refreshing token... clearing tokens');

                store.dispatch(clearTokens());
                console.log("accesstoken : ", useSelector((state) => state.auth.accessToken));
                console.log("refreshtoken : ", useSelector((state) => state.auth.refreshToken));

                useNavigate('/');
                toast.error('Session expired. Please login again.');

                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;