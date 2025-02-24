// "use client"

// import "react-quill-new/dist/quill.snow.css";
// import hljs from "highlight.js";
// import "highlight.js/styles/github.css";
// hljs.configure({ languages: ['typescript', 'java', 'javascript', 'mysql'] });
// window.hljs = hljs;

// import dynamic from "next/dynamic";
// import useEditStore from "@/lib/zustand/post";
// import React, { useCallback, useMemo, useRef } from "react";
// import CustomToolbar from "./CustomToolbar";
// import { bindings, formats } from "./Customization";
// import { uploadImage } from "@/lib/uploadImage";

// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// export default function Editor() {
//   const { post, addContent } = useEditStore();
//   const quillRef = useRef<any>(null);

//   const handleContentChange = (value: string) => {
//     addContent(value);
//   }

//   const imageHandler = useCallback(() => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = () => {
//       if (input.files && input.files[0]) {
//         const file = input.files[0];
//         const reader = new FileReader();

//         reader.onload = () => {
//           const base64 = reader.result;
//           const quill = quillRef.current?.getEditor();
//           const range = quill?.getSelection(true) || { index: 0 };

//           if (base64 && quill) {
//             quill.insertEmbed(range.index, "image", base64);
//             addContent(quill.root.innerHTML);
//           }
//         };

//         reader.readAsDataURL(file);
//       }
//     };
//   }, []);

//   const modules = useMemo(() => {
//     return {
//       toolbar: "#toolbar",
//       handlers: {
//         image: imageHandler
//       },
//       keyboard: { bindings },
//       syntax: true,
//     };
//   }, [imageHandler]);

//   return (
//     <div className="w-full">
//       <CustomToolbar />
//       <ReactQuill
//         ref={quillRef}
//         theme="snow"
//         value={post.content}
//         onChange={handleContentChange}
//         modules={modules}
//         formats={formats}
//         placeholder="Write your story..."
//       />
//     </div>
//   );
// }


"use client"

import "react-quill-new/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
hljs.configure({ languages: ['typescript', 'java', 'javascript', 'mysql'] });
window.hljs = hljs;

import dynamic from "next/dynamic";
import useEditStore from "@/lib/zustand/post";
import React, { useCallback, useMemo, useRef } from "react";
import CustomToolbar from "./CustomToolbar";
import { bindings, formats } from "./Customization";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    const Quill = RQ.Quill;
    const ImageBlot = Quill.import("formats/image");
    ImageBlot.className = "quill-image";
    ImageBlot.tagName = "img";
    Quill.register(ImageBlot, true);
    return RQ;
  },
  { ssr: false }
);

export default function Editor() {
  const { post, addContent } = useEditStore();
  const quillRef = useRef<any>(null);

  const handleContentChange = (value: string) => {
    addContent(value);
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          const base64 = reader.result;
          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection(true) || { index: 0 };

          if (base64 && quill) {
            try {
              quill.insertEmbed(range.index, "image", base64);
              addContent(quill.root.innerHTML);
            } catch (error) {
              console.error("Error inserting image:", error);
            }
          }
        };

        reader.readAsDataURL(file);
      }
    };
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: "#toolbar",
      handlers: {
        image: imageHandler
      }
    },
    keyboard: { bindings },
    syntax: true,
    clipboard: {
      matchVisual: false
    }
  }), [imageHandler]);

  const updatedFormats = useMemo(() => [...formats, "image"], []);

  return (
    <div className="w-full">
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={post.content}
        onChange={handleContentChange}
        modules={modules}
        formats={updatedFormats}
        placeholder="Write your story..."
      />
    </div>
  );
}