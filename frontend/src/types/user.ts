export interface User {
  id: string;
  name: string;
}

export interface UserRequest {
  name: string;
}

export interface ApiResponse<T> {
  message?: string;
  data: T;
}