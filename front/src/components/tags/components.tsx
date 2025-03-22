export function TagsTitle({
  tagName
}: {
  tagName: string
}) {
  return (
    <h1 className="text-4xl font-bold mt-10 mb-5"># {tagName}</h1>
  )
}