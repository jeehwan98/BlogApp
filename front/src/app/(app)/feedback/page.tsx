import { getServerSession } from "@/lib/auth/auth-server";

export default function FeedbackPage() {
  const user = getServerSession();
  console.log("user details?: ", user);
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is a simple example of a Next.js page.</p>
    </div>
  );
}