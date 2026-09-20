import { useState } from "react";
import { AuthContext } from "./authContext";

const USER_STORAGE_KEY = "addis-eats-user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  function login(phone) {
    setLoading(true);
    const authenticatedUser = { phone };
    setUser(authenticatedUser);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
    } catch (e) {
      console.error("Failed to save auth to localStorage", e);
    }
    setLoading(false);
    return authenticatedUser;
  }

  function logout() {
    setUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to remove auth from localStorage", e);
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
