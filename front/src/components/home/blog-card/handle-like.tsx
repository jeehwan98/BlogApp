"use client"

import { likeBlogAPI } from "@/app/api/blog";
import { Blog, HandleLikeProps } from "@/interfaces/blog";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // For animation

  const handleLike = async () => {
    const newLikedState = !liked;
    // Optimistically update UI before API call
    setLiked(newLikedState);
    setLikes((prev) => (newLikedState ? prev + 1 : prev - 1));
    setIsAnimating(true); // Trigger animation

    try {
      const response = await likeBlogAPI(id, newLikedState);
      console.log("response in client side?: ", response);
      // Assuming likeBlogAPI returns updated like count or confirmation
      // If response contains updated data, sync it here
      if (response && response.success) {
        setLikes(response.likes);
        if (response.isLiked) {
          toast.success("Post has been liked");
        } else {
          toast.success("Post has been unliked");
        }
      }
      if (onLikeChange) {
        onLikeChange(newLikedState, likes); // Notify parent if provided
      }
    } catch (error) {
      console.error("Error updating like:", error);
      // Revert UI on failure
      setLiked(!newLikedState);
      setLikes((prev) => (newLikedState ? prev - 1 : prev + 1));
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
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
      <span className="ml-2 font-thin">{likes}</span>
    </div>
  )
}