import { api } from '../api/api.config';
import type { User, UserRequest, ApiResponse } from '../types/user';

export class UserService {
  static async createUser(userData: UserRequest): Promise<User> {
    const response = await api.post<ApiResponse<User>>('/users', userData);
    return response.data.data;
  }

  static async getUsers(): Promise<User[]> {
    const response = await api.get<ApiResponse<User[]>>('/users');
    return response.data.data;
  }
}