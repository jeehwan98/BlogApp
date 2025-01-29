"use client"

import { useRouter } from "next/navigation";
import InputField, { RegisterBottomNav } from "./Components";
import { useState } from "react";
import { RegisterDetails } from "@/lib/interfaces";
import { registerAPI } from "@/app/api/auth/register";
import { Button } from "../UI/Button";

export default function RegisterForm() {
  const [registerDetails, setregisterDetails] = useState<RegisterDetails>({ email: "", password: "", username: "", name: "", provider: "" });
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [registerError, setRegisterError] = useState<string>("");
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);

    if (checkPassword !== registerDetails.password) {
      setRegisterError("Passwords do not match");
      return;
    }

    try {
      const response = await registerAPI({
        email: registerDetails.email,
        password: registerDetails.password,
        username: registerDetails.username,
        name: registerDetails.name,
        provider: "email"
      });

      if (response?.error) {
        setRegisterError(response.error);
      } else {
        console.log("register successful:", response);
        router.push("/login");
      }
    } catch (error) {
      setRegisterLoading(false);
      console.error("error occurred while logging in: ", error);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <InputField
          type="text"
          name="name"
          placeholder="Name"
          value={registerDetails.name}
          onChange={(e) => setregisterDetails({ ...registerDetails, name: e.target.value })}
        />
        <InputField
          type="text"
          name="username"
          placeholder="Username"
          value={registerDetails.username}
          onChange={(e) => setregisterDetails({ ...registerDetails, username: e.target.value })}
        />
        <InputField
          type="text"
          name="email"
          placeholder="example@email.com"
          value={registerDetails.email}
          onChange={(e) => setregisterDetails({ ...registerDetails, email: e.target.value })}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={registerDetails.password}
          onChange={(e) => setregisterDetails({ ...registerDetails, password: e.target.value })}
        />
        <InputField
          type="password"
          name="checkPassword"
          placeholder="Check Password"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />
        {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
        <Button
          type="submit"
          disabled={registerLoading}
          className="w-full"
        >
          {registerLoading ? 'Registering...' : 'Register'}
        </Button>
        <RegisterBottomNav />
      </form>
    </div>
  )
}