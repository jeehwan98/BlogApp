"use client"

import { securityAction } from "@/app/(app)/setting/security/action";
import { Button } from "@/components/ui/button";
import { FormInput, PasswordInput } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function SecurityContent() {
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmPassword] = useState<boolean>(false);
  const [state, formAction, isPending] = useActionState(securityAction, {
    success: false,
    errors: {},
  });
  const router = useRouter();

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showPassword);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword(!showConfirmPassword);
  }

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
  }, [state, router]);

  return (
    <div className="flex justify-center items-center">
      <form action={formAction} className="w-[20%]">
        <PasswordInput
          name="currentPassword"
          placeholder="Current Password"
          togglePasswordVisibility={toggleCurrentPasswordVisibility}
          showPassword={showCurrentPassword}
          error={state?.errors?.currentPassword}
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
          {isPending ? <Loader2 className="animate-spin" /> : "Reset Password"}
        </Button>
      </form>
    </div>
  )
}