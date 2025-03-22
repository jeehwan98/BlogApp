import { TagsTitle } from "@/components/tags/components";
import TagsContent from "@/components/tags/tags-content";

export default function TagsPage({
  params
}: {
  params: { tagName: string }
}) {
  const tagName = decodeURIComponent(params.tagName);

  return (
    <div className="w-[70%] mx-auto">
      <TagsTitle tagName={tagName} />
      <TagsContent tagName={tagName} />
    </div>
  )
}