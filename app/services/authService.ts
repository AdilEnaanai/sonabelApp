import api from "./api";
import { LoginRequest, RegisterPayload, RegisterResponse } from "../types/auth";

export const register = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>("/users", payload);
    return response.data;
  } catch (error: any) {
    // Axios met l'erreur serveur dans error.response.data
    const message = error.response?.data?.message ?? "Erreur réseau. Réessaie.";
    throw new Error(message);
  }
};

export const login = async (loginRequest: LoginRequest) => {
  const response = await api.post<boolean>("/users/auth", {
    email: loginRequest.email,
    password: loginRequest.password,
  });
  console.log("Login response:", response.data);
  return response.data;
};
