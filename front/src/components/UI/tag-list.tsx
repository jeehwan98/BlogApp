import { useRouter } from "next/navigation";

export default function TagList({ tags }: { tags: string[] }) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-2 border-none overflow-x">
      {tags.map((tag: string, index: number) => (
        <span
          key={index}
          className="flex items-center bg-gray-50 text-gray-800 rounded-lg px-3 py-1 text-base cursor-pointer hover:bg-gray-200"
        >
          <span onClick={() => router.push(`/tags/${tag}`)}>
            {tag}
          </span>
        </span>
      ))}
    </div>
  )
}