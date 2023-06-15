import axios from 'axios';
import { authLogin, authLogout } from '../store/storageSlice';
import { store } from '../store';
import { config } from '../config';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${config.serverUrl}/auth/refresh-token`, {
      refreshToken
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    
    store.dispatch(authLogin({
      userId: store.getState().storage.userId,
      accessToken,
      refreshToken: newRefreshToken
    }));

    return accessToken;
  } catch (error) {
    store.dispatch(authLogout());
    throw error;
  }
};

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = store.getState().storage.refreshToken;
        const newAccessToken = await refreshToken(refreshToken);
        processQueue(null, newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default refreshToken; 