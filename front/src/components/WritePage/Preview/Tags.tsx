"use client"

import useEditStore from "@/lib/zustand/post"

export default function PreviewTags() {
  const { post } = useEditStore();
  return (
    <div className="flex flex-wrap items-center gap-2 border-none overflow-x">
      {post.tags.map((tag: string, index: number) => (
        <span
          key={index}
          className="flex items-center bg-gray-50 text-gray-800 rounded-lg px-3 py-1 text-base cursor-pointer hover:bg-gray-200"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}