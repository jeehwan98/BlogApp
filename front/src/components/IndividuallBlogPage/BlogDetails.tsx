import { Blog } from "@/lib/interfaces";
import TagButton from "../UI/Tags";

export default function BlogInfo({ blogInfo }: { blogInfo: Blog }) {
  console.log("blogInfo?:", blogInfo);
  return (
    <>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2">
          <span>{blogInfo.user.name}</span>
          <span>{blogInfo.createdAt}</span>
        </div>

      </div>
      {/* TAGS */}
      <div className="flex flex-wrap items-center gap-2 border-none overflow-x mt-3">
        {blogInfo.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="flex items-center bg-gray-50 text-gray-800 rounded-lg px-3 py-1 text-base cursor-pointer hover:bg-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  )
}