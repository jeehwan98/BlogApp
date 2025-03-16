"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContextType, User } from "@/interfaces/user";
import { logoutAPI } from "@/app/api/auth/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: User | null; // set by server-side fetch
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!initialUser) {
      refreshUser();
    }
  }, []);

  const refreshUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/current", {
        credentials: "include",
      });
      if (response.ok) {
        const userData = (await response.json()) as User;
        setUser(userData);
      } else if (response.status === 401) {
        router.push("/login");
      } else {
        setError("Failed to fetch user");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const logout = async () => {
    console.log("trying to logout in auth/client")
    try {
      await logoutAPI();
      setUser(null);
      // redirect to login upon successful logout
      window.location.href = "/"; // force reload to re-render RootLayout
      window.location.reload();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const value: AuthContextType = {
    user,
    setUser,
    error,
    refreshUser,
    logout,
  };

  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}

export function useAuth(): AuthContextType & { refreshUser: () => Promise<void> } {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}