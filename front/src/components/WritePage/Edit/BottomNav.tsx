"use client"

import { postBlogAPI } from "@/app/api/blog";
import { Button } from "@/components/UI/Button";
import { uploadImage } from "@/lib/cloudinary";
import useEditStore from "@/lib/zustand/post";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditBottomNav() {
  const { post, addContent } = useEditStore();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const extractBase64Images = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const images = doc.getElementsByTagName("img");
    return Array.from(images).filter((img) =>
      img.src.startsWith("data:image/")
    );
  };

  const base64ToFile = (base64String: string, filename: string) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const uploadImageToCloudinary = async (base64Image: string) => {
    const response = await fetch("/api/upload-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64Image }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to upload image");
    }
    return data.url;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post.title || !post.content || !post.tags) {
      alert("값을 입력하셔야 합니다");
      return;
    }

    setLoading(true);
    try {
      let updatedContent = post.content;

      // Extract base64 images from content
      const base64Images = extractBase64Images(post.content);

      // Upload each image to Cloudinary and replace base64 with URL
      for (const img of base64Images) {
        const base64Src = img.src;
        const cloudinaryUrl = await uploadImageToCloudinary(base64Src);
        updatedContent = updatedContent.replace(base64Src, cloudinaryUrl);
      }

      // Submit the updated content to the backend
      const response = await postBlogAPI({
        title: post.title,
        tags: post.tags,
        content: updatedContent,
      });

      if (response?.error) {
        setError(response.error);
      } else {
        console.log("Post blog:", response);
        router.push("/");
      }
    } catch (error) {
      console.error("Error occurred while posting blog: ", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-1/2 bg-white border-t border-gray-300 flex justify-between items-center px-4 py-3">
      <Link
        href="../"
        className="text-black px-4 py-2 rounded-md flex items-center hover:bg-gray-100"
      >
        나가기
      </Link>
      <div className="flex gap-4">
        <Button className="bg-green-500 text-white hover:bg-green-600 font-bold px-4 py-2" onClick={onSubmit}>
          {loading ? '저장...' : '출간'}
        </Button>
      </div>
    </div>
  )
}