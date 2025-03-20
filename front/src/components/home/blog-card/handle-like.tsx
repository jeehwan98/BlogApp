"use client"

import { likeBlogAPI } from "@/app/api/blog";
import { Blog, HandleLikeProps } from "@/interfaces/blog";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function HandleLike({
  id,
  initialLikes,
  initialLiked,
  onLikeChange
}:
  HandleLikeProps
) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [liked, setLiked] = useState<boolean>(initialLiked);

  const handleLike = async () => {
    const newLikedState = !liked;
    // setLiked(newLikedState);
    // setLikes(prev => newLikedState ? prev + 1 : prev - 1);
    try {
      await likeBlogAPI(id, newLikedState);
    } catch (error) {
      console.error("Error liking the button: ", error);
    }
  }
  return (
    <div
      className={`flex items-center cursor-pointer ${liked ? 'text-red-500' : 'hover:text-red-500'
        }`}
      onClick={handleLike}
    >
      <Heart
        className={`w-4 h-4 ${liked ? 'fill-current' : ''}`}
      />
      <span className="ml-2 font-thin">{initialLikes}</span>
    </div>
  )
}