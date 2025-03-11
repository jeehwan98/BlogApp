import { AlertMessage, AuthFormContainer, AuthHeader } from "@/components/auth/components";
import LoginForm from "@/components/form/auth/login";
import { Line, LoginBottomNav } from "@/components/form/auth/login/components";
import GithubSignInButton from "@/components/form/auth/login/github-button";

export default function LoginPage() {


  return (
    <>
      <AlertMessage />
      <AuthFormContainer>
        <AuthHeader />
        <LoginForm />
        <LoginBottomNav />
        <Line />
        <GithubSignInButton />
      </AuthFormContainer>
    </>
  )
}