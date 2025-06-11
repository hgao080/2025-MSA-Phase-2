import axios, { AxiosResponse } from 'axios'

export const axiosClient = axios.create({
  baseURL: `http://localhost:5006/api`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const apiRequest = async <T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Promise<T> => {
  const response: AxiosResponse<T> = await axiosClient({
    method,
    url,
    data,
  });

  return response.data;
}