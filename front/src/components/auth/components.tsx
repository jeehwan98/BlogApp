"use client"

import { CircleCheck } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

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
          : pathname === "/reset-password"
            ? "Reset Password"
            : "";

  return (
    <h1 className="text-2xl font-bold text-center my-4 mb-4">
      {headerName}
    </h1>
  )
}

export function AlertMessage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const [alertMessage, setAlertMessage] = useState<string | null>(message);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!alertMessage) return null;

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg gap-3 animate-fadeIn">
      <div className="flex justify-center gap-2 align-middle text-center items-center">
        <CircleCheck className="w-5 h-5" />
        <span>{alertMessage}</span>
      </div>
    </div>
  );
}