"use client"

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function AuthFormContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm  w-full px-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export function AuthHeader() {
  const pathname = usePathname();

  const headerName =
    pathname === "/login"
      ? "Sign In"
      : pathname === "/register"
        ? "Register"
        : pathname === "/forgot-password"
          ? "Forgot Password"
          : "";

  return (
    <h1 className="text-2xl font-bold text-center my-4 mb-4">
      {headerName}
    </h1>
  )
}