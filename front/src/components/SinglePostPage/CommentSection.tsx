"use client"

import React, { useRef, useState } from "react";
import { Button } from "../UI/Button";
import { Blog } from "@/lib/interfaces";
import { postCommentAPI } from "@/app/api/comment";

export default function CommentSection({ blogInfo }: { blogInfo: Blog }) {
  const [comment, setComment] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [posting, setPosting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // expand dynamically
    }
  };

  const handlePostComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("값을 입력하셔야 합니다");
      return;
    }
    setPosting(true);
    try {
      const response = await postCommentAPI(blogInfo.id, comment);
      console.log("Response:", response);

      if (response.success) {
        setComment("");
        alert("comment posted successfully");
      } else {
        alert("Failed to post comment");
      }

    } catch (error) {
      setPosting(false);
      console.error("Error occurred while posting comments", error);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 w-full mt-5">
      {/* COMMENT TITLE */}
      <div className="flex items-center gap-1">
        <span className="lg:text-xl md:text-lg text-base font-semibold">0</span>
        <h1 className="lg:text-xl md:text-lg text-base font-semibold">Comments</h1>
      </div>
      {/* COMMENT WRITE AREA */}
      <div className="flex items-center justify-between gap-8">
        <textarea
          ref={textAreaRef}
          className="w-full min-h-[40px] max-h-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          placeholder="Write a comment..."
          value={comment}
          onChange={handleChange}
          rows={3} // start with 3 rows
          style={{ overflowY: "hidden", resize: "none" }} // prevent manual resize
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handlePostComment}
          disabled={posting}
        >
          {posting ? "Posting" : "Post"}
        </Button>
      </div>
    </div>
  )
}