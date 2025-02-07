"use client"

import { postBlogAPI } from "@/app/api/blog/post";
import { Button } from "@/components/UI/Button";
import useEditStore from "@/lib/zustand/post";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditBottomNav() {
  const { post } = useEditStore();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post.title || !post.content || !post.tags) {
      alert("값을 입력하셔야 합니다");
      return;
    }
    setLoading(false);
    try {
      const response = await postBlogAPI({
        title: post.title,
        tags: post.tags,
        content: post.content
      });

      if (response?.error) {
        setError(response.error);
      } else {
        console.log("Post blog:", response);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      console.error("error occurred while posting blog: ", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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