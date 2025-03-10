import { AuthFormContainer, AuthHeader } from "@/components/auth/components";
import ForgotPasswordForm from "@/components/form/auth/forgot-password";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <AuthFormContainer>
      <AuthHeader />
      <ForgotPasswordForm />
      <p className="text-center text-sm mt-2">
        <Link href="/login" className="text-blue-600 hover:underline">
          Back to Sign In
        </Link>
      </p>
    </AuthFormContainer>
  )
}