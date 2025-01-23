import EditSection from "@/components/WritePage/Edit";
import PreviewSection from "@/components/WritePage/Preview";
import { EditWrapper, WriteWrapper } from "@/components/WritePage/WriteComponents";

export default function WritePage() {
  return (
    // currently... writing a blog post is only available on the desktop version and not tablet or phones
    <WriteWrapper>
      <EditSection />
      <PreviewSection />
    </WriteWrapper>
  )
}