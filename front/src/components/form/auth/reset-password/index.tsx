"use client"

import { resetPasswordAction } from "@/app/(app)/reset-password/action";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/input";
import { ResetPasswordProps } from "@/interfaces/auth/reset-password";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

export default function ResetPasswordForm() {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmPassword] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(resetPasswordAction, {
    success: false,
    errors: {},
  } as ResetPasswordProps);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword(!showConfirmPassword);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (token) {
      formData.append("token", token); // attach token to formData
    }

    startTransition(() => {
      formAction(formData);
    })
  }
  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        router.push("/login?message=Password reset successfully!");
      }, 0);
    }
  }, [state?.success, router])

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
      <p className="text-center text-sm mt-2">
        <Link href="/login" className="text-blue-600 hover:underline">
          Back to Sign In
        </Link>
      </p>
    </>
  )
}
