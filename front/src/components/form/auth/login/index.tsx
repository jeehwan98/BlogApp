"use client"

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { FormInput, PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import { loginAction } from "@/app/(app)/login/action";
import { useAuth } from "@/lib/auth-client";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    errors: {},
  });
  const router = useRouter();
  const { user } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    if (state.success && !isPending) {
      window.location.href = "/";
    } else if (user) {
      router.push("/"); // redirect if already authorized
    }
  }, [state.success, isPending, user, router]);

  return (
    <div className="max-w-sm mx-auto">
      <form action={formAction}>
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
          error={state?.errors?.password || state?.errors?.general}
        />
        <Button
          disabled={isPending}
          className="w-full mt-3"
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Login"}
        </Button>
      </form>
    </div>
  )
}