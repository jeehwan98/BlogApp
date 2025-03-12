import { PreviewContainer } from "../components";
import PreviewContent from "./Content";
import PreviewTags from "./Tags";
import PreviewTitle from "./Title";

export default function PreviewSection() {
  return (
    <PreviewContainer>
      <PreviewTitle />
      <PreviewTags />
      <PreviewContent />
    </PreviewContainer>
  )
}