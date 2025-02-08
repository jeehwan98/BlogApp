import { Tags } from "@/lib/interfaces";

export default function TagButton({ post }: { post: Tags }) {
  return (
    {
      post.tags.map((tag: string, index: number) => (
        <span
          key={index}
          className="flex items-center bg-gray-50 text-gray-800 rounded-lg px-3 py-1 text-base cursor-pointer hover:bg-gray-200"
        >
          {tag}
        </span>
      ))
    }
  )
}