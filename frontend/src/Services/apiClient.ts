import axios, { type AxiosResponse } from 'axios';

export const axiosClient = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/api`,
	headers: {
		'Content-Type': 'application/json',
	},
  withCredentials: true,
});

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
