import { AuthFormContainer, AuthHeader } from "@/components/auth/components";
import ForgotPasswordForm from "@/components/form/auth/forgot-password";

export default function ForgotPasswordPage() {
  return (
    <AuthFormContainer>
      <AuthHeader />
      <ForgotPasswordForm />
    </AuthFormContainer>
  )
}