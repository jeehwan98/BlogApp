"use client"

import useEditStore from "@/lib/zustand/post"
import DOMPurify from "dompurify"

export default function PreviewContent() {
  const { post } = useEditStore();

  return (
    <div className="ql-snow">
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post?.content),
        }}
        style={{
          marginTop: "30px",
          overflow: "auto",
          whiteSpace: "normal"
        }}
      />
    </div>
  )
}