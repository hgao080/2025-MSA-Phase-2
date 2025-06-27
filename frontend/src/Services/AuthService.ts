import { apiRequest } from './apiClient';
import { type User } from '../Models/User'
import { type RegisterRequest, type LoginRequest } from '../Models/Auth';

export const loginUser = async (req: LoginRequest): Promise<User> => {
  try {
    return await apiRequest<User>('/Auth/login', 'POST', req);
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('Login failed');
  }
};

export const registerUser = async (req: RegisterRequest): Promise<void> => {
  try {
    await apiRequest<void>('/Auth/register', 'POST', req);
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Registration failed');
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    return await apiRequest<User>('/Auth/me', 'GET');
  } catch (error) {
    console.error('Error getting current user:', error);
    throw new Error('Failed to get user info');
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await apiRequest<void>('/Auth/logout', 'POST');
  } catch (error) {
    console.error('Error logging out user:', error);
    throw new Error('Logout failed');
  }
};