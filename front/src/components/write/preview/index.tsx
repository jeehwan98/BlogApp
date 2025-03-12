import { PreviewContainer } from "../components";
import PreviewContent from "./content";
import PreviewTags from "./tags";
import PreviewTitle from "./title";

export default function PreviewSection() {
  return (
    <PreviewContainer>
      <PreviewTitle />
      <PreviewTags />
      <PreviewContent />
    </PreviewContainer>
  )
}