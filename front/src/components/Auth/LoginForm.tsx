"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import InputField, { Line, LoginBottomNav } from "./Components";
import { Button, GithubSignInButton } from "../UI/Button";
import { loginAPI } from "@/app/api/auth/auth";
import { useSession } from "@/lib/SessionProvider";

interface LoginDetails {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const router = useRouter();
  const { refreshSession } = useSession();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(false);
    try {
      const response = await loginAPI({
        email: loginDetails.email,
        password: loginDetails.password,
      });

      if (response?.error) {
        setLoginError(response.error);
      } else {
        console.log("Login successful:", response);
        refreshSession(); // refresh session after login
        router.push("/");
      }
    } catch (error) {
      setLoginLoading(false);
      console.error("error occurred while logging in: ", error);
      setLoginError("An unexpected error occurred. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <InputField
          type="text"
          name="email"
          placeholder="example@email.com"
          value={loginDetails.email}
          onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={loginDetails.password}
          onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
        />
        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
        <Button
          type="submit"
          disabled={loginLoading}
          className="w-full"
        >
          {loginLoading ? 'Logging in...' : 'Login'}
        </Button>
        <LoginBottomNav />
        <Line />
        <GithubSignInButton />
      </form>
    </div>
  )
}