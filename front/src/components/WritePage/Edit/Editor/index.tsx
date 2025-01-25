"use client"

import useEditStore from "@/lib/zustand/post";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar";
import { bindings, formats } from "./Customization";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";


hljs.configure({ languages: ['typescript', 'java', 'javascript', 'mysql'] })
// if (typeof window !== "undefined") {
//   window.hljs = hljs;
// }

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Editor() {
  const { post, addContent } = useEditStore();

  const handleContentInput = (value: string) => {
    console.log("editor content: ", value);
    addContent(value);
  }

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input?.files?.[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const { imageUrl } = await response.json();

        const quill = (document.querySelector(".ql-editor") as any).__quill;
        const range = quill.getSelection(true);

        quill.insertEmbed(range.index, "image", imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    })
  }

  const modules = useMemo(() => {
    return {
      toolbar: "#toolbar",
      keyboard: { bindings },
      syntax: true,
      handlers: {
        image: handleImageUpload
      }
    };
  }, []);

  return (
    <div className="w-full">
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        value={post.content}
        onChange={handleContentInput}
        modules={modules}
        formats={formats}
        placeholder="Write your story..."
      />
    </div>
  );
}
