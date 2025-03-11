"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthFormContainer, AuthHeader } from "@/components/auth/components";
import ResetPasswordForm from "@/components/form/auth/reset-password";

export default function ResetRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token") as string;
    console.log("Extracted Token:", token); // Debugging

    if (token) {
      console.log("Redirecting to:", `/reset-password?token=${token}`);
      setTimeout(() => {
        router.replace(`/reset-password?token=${token}`);
      }, 100); // Small delay to ensure searchParams is loaded
    } else {
      console.log("No token found, staying on page.");
    }
  }, [router, searchParams]);

  return (
    <AuthFormContainer>
      <AuthHeader />
      <ResetPasswordForm />
    </AuthFormContainer>
  );
}
