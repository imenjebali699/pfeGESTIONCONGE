"use client";

import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import {jwtDecode} from "jwt-decode";

export interface JWTPayload {
  sub: string;
  role: string;
  exp: number;
}

export interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  getDefaultRoute: (role: string) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JWTPayload>(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ email: decoded.sub, role: decoded.role });
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    try {
      const decoded = jwtDecode<JWTPayload>(token);
      setUser({ email: decoded.sub, role: decoded.role });
    } catch (error) {
      console.error("Erreur de décodage du token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const getDefaultRoute = (role: string): string => {
    const normalizedRole = role.toUpperCase().replace(/^ROLE_/, "");
    switch (normalizedRole) {
      case "ADMIN":
        return "/dashboard_admin";
      case "RESPONSABLE_RH":
        return "/tableauboardrh";
      case "MANAGER":
        return "/dashboardmanager";
      case "EMPLOYE":
        return "/dashboardemployee";
      default:
        return "/";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getDefaultRoute }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
