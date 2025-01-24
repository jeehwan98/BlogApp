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
if (typeof window !== "undefined") {
  window.hljs = hljs;
}

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Editor() {
  const { post, addContent } = useEditStore();

  const handleContentInput = (value: string) => {
    console.log("editor content: ", value);
    addContent(value);
  }

  const modules = useMemo(() => {
    return {
      toolbar: "#toolbar",
      keyboard: { bindings },
      syntax: true,
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
