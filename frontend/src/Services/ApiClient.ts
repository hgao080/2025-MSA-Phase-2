import axios, { type AxiosResponse } from 'axios';

// Token management utilities
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('token');
};

export const axiosClient = axios.create({
	baseURL:  import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor to add JWT token
axiosClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for token expiration handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - remove token and redirect to login
      removeAuthToken();
      // Only redirect if we're not already on login/register pages
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const apiRequest = async <T>(
	url: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
	data?: unknown
): Promise<T> => {
	const response: AxiosResponse<T> = await axiosClient({
		method,
		url,
		data,
	});

	return response.data;
};
