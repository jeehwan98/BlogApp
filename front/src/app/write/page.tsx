import EditSection from "@/components/write/edit";
import PreviewSection from "@/components/write/preview";
import { WriteContainer } from "@/components/write/components";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function WritePage() {
  const user = await getServerSession();
  if (!user) {
    redirect("/login");
  }
  return (
    // currently only available on desktop and not mobile or tablet
    <WriteContainer>
      <EditSection />
      <PreviewSection />
    </WriteContainer>
  )
}