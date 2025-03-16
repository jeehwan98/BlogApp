import FeedbackInfo from "@/components/feedback";
import { getServerSession } from "@/lib/auth/auth-server";

export default function FeedbackPage() {
  const user = getServerSession();

  return (
    <div>
      <h1>Feedback Title</h1>
      <FeedbackInfo />
    </div>
  );
}