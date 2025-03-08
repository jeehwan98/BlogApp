import EditSection from "@/components/WritePage/Edit";
import PreviewSection from "@/components/WritePage/Preview";
import { WriteWrapper } from "@/components/WritePage/WriteComponents";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function WritePage() {
  const user = await getServerSession();
  if (!user) {
    redirect("/login");
  }
  return (
    // currently only available on desktop and not mobile or tablet
    <WriteWrapper>
      <EditSection />
      <PreviewSection />
    </WriteWrapper>
  )
}