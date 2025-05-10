import FeedbackInfo from "@/components/feedback";
import { FeedbackTitle } from "@/components/feedback/components";
import { getServerSession } from "@/lib/auth/auth-server";

export default async function FeedbackPage() {
  const user = await getServerSession();

  if (!user) {
    return ("/");
  }

  if (user.role !== "ADMIN") {
    alert("Only admins can access this page");
  }

  return (
    <>
      <FeedbackTitle />
      <FeedbackInfo />
    </>
  );
}