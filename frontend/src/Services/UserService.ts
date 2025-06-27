import { apiRequest } from './apiClient';
import { type UpdateUserRequest, type User } from '../Models/User'

export const updateUser = async (req: UpdateUserRequest): Promise<User> => {
  try {
    return await apiRequest<User>('/User/profile', 'PUT', req);
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Update failed');
  }
}