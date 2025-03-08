import LoginForm from "@/components/form/auth/login";
import { AuthHeader, AuthFormContainer } from "@/components/form/auth/components";
import { Line, LoginBottomNav } from "@/components/form/auth/login/components";
import GithubSignInButton from "@/components/form/auth/login/github-button";

export default function LoginPage() {
  return (
    <AuthFormContainer>
      <AuthHeader />
      <LoginForm />
      <LoginBottomNav />
      <Line />
      <GithubSignInButton />
    </AuthFormContainer>
  )
}