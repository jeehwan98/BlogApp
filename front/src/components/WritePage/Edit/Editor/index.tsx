"use client"

import "react-quill-new/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
hljs.configure({ languages: ['typescript', 'java', 'javascript', 'mysql'] });
window.hljs = hljs;

import dynamic from "next/dynamic";
import useEditStore from "@/lib/zustand/post";
import React, { useMemo } from "react";
import CustomToolbar from "./CustomToolbar";
import { bindings, formats } from "./Customization";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Editor() {
  const { post, addContent } = useEditStore();

  const modules = useMemo(() => {
    return {
      toolbar: "#toolbar",
      keyboard: { bindings },
      syntax: true,
    };
  }, []);

  const handleContentChange = (value: string) => {
    addContent(value);
  }

  return (
    <div className="w-full">
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        value={post.content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        placeholder="Write your story..."
      />
    </div>
  );
}
