"use client"

import { forgotPasswordAction } from "@/app/(app)/forgot-password/action";
import { Button } from "@/components/ui/Button"
import { FormInput } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { useActionState } from "react";

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, {
    success: false,
    message: "",
    errors: {}
  });

  return (
    <form className="space-y-4" action={formAction}>
      <FormInput
        name="email"
        placeholder="jee@email.com"
        error={state?.errors?.email}
        icon={Mail}
      />
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Reset Password"}
      </Button>
    </form>
  )
}