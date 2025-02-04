"use client"

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  image?: string;
  role?: string;
}

const SessionContext = createContext<User | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function fetchUser() {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include"
      });
      if (!response.ok) return setUser(null);
      const data = await response.json();
      console.log("data?:", data.decoded);
      setUser(data.decoded);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  function refreshSession() {
    fetchUser();
  }

  return <SessionContext.Provider value={{ user, refreshSession }}>{children}</SessionContext.Provider>;
}

// custom hook to use session data
export function useSession() {
  return useContext(SessionContext);
}
