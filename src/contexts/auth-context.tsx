"use client";

import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const authStatus = localStorage.getItem("isAuthenticated");
      if (authStatus === "true") {
        setIsAuthenticated(true);
      }
    } catch (error) {
        console.error("Could not access local storage:", error)
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (password: string) => {
    // This is a mock login. In a real app, you'd verify credentials.
    if (password === "password") {
      try {
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
        router.push("/");
      } catch (error) {
        console.error("Could not access local storage:", error)
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    try {
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
        console.error("Could not access local storage:", error)
    } finally {
        setIsAuthenticated(false);
        router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
