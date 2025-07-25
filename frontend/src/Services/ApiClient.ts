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
	try {
		const response: AxiosResponse<T> = await axiosClient({
			method,
			url,
			data,
		});

		return response.data;
	} catch (error: unknown) {
		// Extract meaningful error messages from the response
		if (axios.isAxiosError(error) && error.response?.data) {
			const errorData = error.response.data;
			
			// Handle validation errors (ModelState)
			if (typeof errorData === 'object' && errorData && 'errors' in errorData) {
				const validationErrors = Object.values(errorData.errors as Record<string, string[]>).flat();
				throw new Error(validationErrors.join(', '));
			}
			
			// Handle Identity errors array
			if (Array.isArray(errorData)) {
				const errorMessages = errorData.map((err: { description?: string; code?: string } | string) => {
					if (typeof err === 'string') return err;
					return err.description || err.code || 'Unknown error';
				}).join(', ');
				throw new Error(errorMessages);
			}
			
			// Handle simple string error messages
			if (typeof errorData === 'string') {
				throw new Error(errorData);
			}
			
			// Handle objects with message property
			if (typeof errorData === 'object' && errorData && 'message' in errorData) {
				throw new Error(errorData.message as string);
			}
		}
		
		// Fallback to original error
		throw error;
	}
};
