"use client"

import useEditStore from "@/lib/zustand/post";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar";
import { bindings, formats } from "./Customization";
import hljs from "highlight.js/lib/common";
import Quill from "quill";
import "quill-syntax";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
Quill.register("modules/syntax", true);

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
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
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
        className="!border-none text-lg"
      />
    </div>
  );
}
