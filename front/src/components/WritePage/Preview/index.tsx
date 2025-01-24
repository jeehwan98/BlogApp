import { PreviewWrapper } from "../WriteComponents";
import PreviewTags from "./Tags";
import PreviewTitle from "./Title";

export default function PreviewSection() {
  return (
    <PreviewWrapper>
      <PreviewTitle />
      <PreviewTags />
    </PreviewWrapper>
  )
}