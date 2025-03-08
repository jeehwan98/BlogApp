"use client"

import React, { useActionState, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormImageInput, FormInput, PasswordInput } from "@/components/ui/input";
import { RegisterBottomNav } from "./components";
import { registerAction } from "@/app/(app)/register/action";
import { Loader2, Mail, User } from "lucide-react";
import { RegisterStateProps } from "@/interfaces/auth";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmPassword] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [state, formAction, isPending] = useActionState(registerAction, {
    success: false,
    errors: {},
  } as RegisterStateProps);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a preview URL
      setPreviewUrl(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword(!showConfirmPassword);
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6">
      <form action={formAction} className="space-y-4">
        <FormImageInput
          name="image"
          previewUrl={previewUrl}
          fileInputRef={fileInputRef}
          handleImageChange={handleImageChange}
          triggerFileInput={triggerFileInput}
        />
        <FormInput
          name="name"
          placeholder="John Doe"
          error={state?.errors?.name}
          icon={User}
        />
        <FormInput
          name="email"
          placeholder="jee@email.com"
          error={state?.errors?.email}
          icon={Mail}
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          togglePasswordVisibility={togglePasswordVisibility}
          showPassword={showPassword}
          error={state?.errors?.password}
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm Password"
          togglePasswordVisibility={toggleConfirmPasswordVisibility}
          showPassword={showConfirmPassword}
          error={state?.errors?.confirmPassword || state?.errors?.general}
        />
        <Button
          disabled={isPending}
          className="w-full mt-3"
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Register"}
        </Button>
        <RegisterBottomNav />
      </form>
    </div>
  )
}