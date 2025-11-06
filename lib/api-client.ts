import { env } from '@/config/env';
import { useAuthStore } from '@/store/use-auth-store';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = useAuthStore.getState().token;

  if (config.headers) {
    config.headers['Content-Type'] = 'application/json';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}

export const api = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const status = error?.response?.status;
    const isAuthEndPoint = originalRequest?.url?.includes('/auth/login') ||
    originalRequest?.url?.includes('/auth/register') ||
    originalRequest?.url?.includes('/auth/verify-2fa') ||
    originalRequest?.url?.includes('/auth/refresh');

    if (isAuthEndPoint)
     {
      const errorMessage =
        (error.response?.data as any)?.message ||
        error.response?.statusText ||
        error.message ||
        'Something went wrong';
      return Promise.reject(new Error(String(errorMessage)));
    }

    // Only handle 401 errors and prevent infinite loops
    if (status === 401 && originalRequest && !originalRequest._retry) {
      //if already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = useAuthStore.getState().refreshToken;

      if (!refreshToken) {
        console.log('No refresh token available');
        isRefreshing = false;
        processQueue(error, null);
        //logout user
        useAuthStore.getState().logout();
        await axios.post(
          `${api.defaults.baseURL}/auth/logout`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        );
        return Promise.reject(error);
      }

      try {
        console.log('Attempting to refresh token...');
        const response = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        //update tokens in store
        useAuthStore.getState().setToken(accessToken);
        if (newRefreshToken) {
          useAuthStore.getState().setRefreshTkn(newRefreshToken);
        }
        console.log('Token refreshed successfully');

        //update the original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        // Process the queue with the new token
        processQueue(null, accessToken);

        // Reset the flag BEFORE retrying the request
        isRefreshing = false;
        //retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        //Process queue with error
        processQueue(refreshError as AxiosError, null);

        //Reset flag
        isRefreshing = false;

        //logout user
        useAuthStore.getState().logout();

        return Promise.reject(refreshError);
      }
    }
    // Handle other errors (404, 500, etc.)
    const errorMessage = 
      (error.response?.data as any)?.message || 
      error.response?.statusText ||
      error.message || 
      'Something went wrong';
    return Promise.reject(new Error(errorMessage));
  },
);
