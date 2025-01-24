"use client"

import useEditStore from "@/lib/zustand/post";
import dynamic from "next/dynamic";
import React, { useCallback, useMemo, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar";
import { bindings, formats } from "./Customization";

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
      keyboard: {
        bindings: bindings
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
