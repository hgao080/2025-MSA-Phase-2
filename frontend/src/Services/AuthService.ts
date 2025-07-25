import { apiRequest, setAuthToken, getAuthToken } from './ApiClient';
import { type User } from '../Models/User'
import { type RegisterRequest, type LoginRequest, type LoginResponse } from '../Models/Auth';

export const loginUser = async (req: LoginRequest): Promise<User> => {
  try {
    const response = await apiRequest<LoginResponse>('/auth/login', 'POST', req);
    
    // Store the JWT token
    setAuthToken(response.token);
    
    // Return the user object
    return {
      id: response.user.id,
      email: response.user.email,
      firstName: response.user.firstName,
      lastName: response.user.lastName,
      summary: response.user.summary || null,
      linkedinUrl: response.user.linkedinUrl || null,
      githubUrl: response.user.githubUrl || null,
      websiteUrl: response.user.websiteUrl || null,
    };
  } catch (error) {
    console.error('Error logging in user:', error);
    // Re-throw the error with specific message from the API
    throw error;
  }
};

export const registerUser = async (req: RegisterRequest): Promise<void> => {
  try {
    await apiRequest<void>('/auth/register', 'POST', req);
  } catch (error) {
    console.error('Error registering user:', error);
    // Re-throw the error with specific message from the API
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    return await apiRequest<User>('/auth/me', 'GET');
  } catch (error) {
    console.error('Error getting current user:', error);
    throw new Error('Failed to get user info');
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};