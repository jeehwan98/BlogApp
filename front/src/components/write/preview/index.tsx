import { PreviewWrapper } from "../components";
import PreviewContent from "./Content";
import PreviewTags from "./Tags";
import PreviewTitle from "./Title";

export default function PreviewSection() {
  return (
    <PreviewWrapper>
      <PreviewTitle />
      <PreviewTags />
      <PreviewContent />
    </PreviewWrapper>
  )
}