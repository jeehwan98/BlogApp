import EditSection from "@/components/WritePage/Edit";
import PreviewSection from "@/components/WritePage/Preview";
import { WriteWrapper } from "@/components/WritePage/WriteComponents";

export default function WritePage() {
  return (
    // currently only available on desktop and not mobile or tablet
    <WriteWrapper>
      <EditSection />
      <PreviewSection />
    </WriteWrapper>
  )
}