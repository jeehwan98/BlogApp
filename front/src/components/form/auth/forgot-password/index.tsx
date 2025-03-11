"use client"

import { forgotPasswordAction } from "@/app/(app)/forgot-password/action";
import { Button } from "@/components/ui/Button"
import { FormInput } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, {
    success: false,
    message: "",
    errors: {}
  });

  if (state.success) {
    return (
      <div className="text-center font-medium">
        <span>Reset link has been sent to your email</span>
        <Button
          variant="ghost"
          asChild
          className="rounded-md mt-2"
        >
          <Link href="/login">
            Back to Sign In
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <form className="space-y-4" action={formAction}>
        <FormInput
          name="email"
          placeholder="jee@email.com"
          error={state?.errors?.email}
          icon={Mail}
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Reset Password"}
        </Button>
      </form>
      <Button
        variant="ghost"
        asChild
        className="w-full rounded-md mt-2"
      >
        <Link href="/login">
          Back to Sign In
        </Link>
      </Button>
    </>
  )
}

