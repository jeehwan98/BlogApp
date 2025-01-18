import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)]">
      <SignUp />
    </div>
  )
}