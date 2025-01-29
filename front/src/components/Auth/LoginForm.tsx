"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputField, { Line, LoginBottomNav } from "./Components";
import { Button, GithubSignInButton } from "../UI/Button";

interface LoginDetails {
  username: string;
  password: string;
}

export default function LoginForm() {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({ username: "", password: "" });
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(false);
    try {
      const response = await signIn("credentials", {
        username: loginDetails.username,
        password: loginDetails.password,
        redirect: false
      });

      if (response?.error) {
        setLoginError(response.error);
      } else {
        console.log("login successful:", response);
        router.push("/");
      }
    } catch (error) {
      setLoginLoading(false);
      console.error("error occurred while logging in: ", error);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <InputField
          type="text"
          name="username"
          placeholder="Username"
          value={loginDetails.username}
          onChange={(e) => setLoginDetails({ ...loginDetails, username: e.target.value })}
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