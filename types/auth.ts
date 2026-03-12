// types/auth.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profilePicture?: string | null;
  token?: string;
  arFullName?: string;
  enFullName?: string;
}

export interface UpdateProfileInput {
  firstName: string;
  lastName: string;
  arFirstName?: string;
  arLastName?: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  message: string;
  success: boolean;
}
