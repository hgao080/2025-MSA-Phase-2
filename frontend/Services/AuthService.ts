import { apiRequest } from "./apiClient";

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  tokenType: string;
  accessToken: string;
  expriesIn: number;
  refreshToken: string;
}

interface User {
  accessToken: string;
}

export const registerUser = async (userData: AuthRequest): Promise<void> => {
  try {
    await apiRequest<void>('/register', 'POST', userData)
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Registration failed");
  }
}

export const loginUser = async (userData: AuthRequest): Promise<User> => {
  try {
    const res = await apiRequest<AuthResponse>('/login?useCookies=true&useSessionCookies=true', 'POST', userData)
    const user: User = {
      accessToken: res.accessToken
    }

    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Registration failed");
  }
}