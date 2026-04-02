import { useState, useEffect } from "react";
import { getMe, logout as logoutAPI } from "../services/authService";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // on every page load, verify the cookie is still valid
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getMe(); // cookie sent automatically
        setUser(res.data);
      } catch {
        setUser(null); // cookie expired or invalid
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // --------------------------------- Login ---------------------------------
  const login = (userData) => {
    setUser(userData);
  };

  // --------------------------------- Logout ---------------------------------
  const logout = async () => {
    try {
      await logoutAPI();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
