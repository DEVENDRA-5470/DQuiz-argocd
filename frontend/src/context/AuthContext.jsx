import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("dquiz_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("dquiz_user");
      }
    }
  }, []);

  function login(data) {
    setUser(data);
    localStorage.setItem("dquiz_user", JSON.stringify(data));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("dquiz_user");
  }

  const isLoggedIn = !!user?.token;
  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn,
        isAdmin,
        isStudent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
