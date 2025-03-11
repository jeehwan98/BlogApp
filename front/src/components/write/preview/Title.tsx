"use client"

import useEditStore from "@/lib/zustand/post"

export default function PreviewTitle() {
  const { post } = useEditStore();
  return (
    <div className="w-full text-4xl font-bold p-2 outline-none bg-transparent overscroll-auto text-black">
      {post.title}
    </div>
  )
}