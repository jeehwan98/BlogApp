import { AuthHeader, AuthFormContainer } from "@/components/form/auth/components";
import RegisterForm from "@/components/form/auth/register";

export default function RegisterPage() {
  return (
    <AuthFormContainer>
      <AuthHeader />
      <RegisterForm />
    </AuthFormContainer>
  )
}