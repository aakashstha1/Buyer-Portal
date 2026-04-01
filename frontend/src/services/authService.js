import api from "./api";

export const register = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const getMe = async () => {
  return await api.get("/users/me");
};
