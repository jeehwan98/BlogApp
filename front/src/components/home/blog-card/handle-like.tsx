"use client"

import { likeBlogAPI } from "@/app/api/blog";
import { HandleLikeProps } from "@/interfaces/blog";
import { useAuth } from "@/lib/auth/auth-client";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function HandleLike({
  id,
  initialLikes,
  initialLiked,
}:
  HandleLikeProps
) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { user } = useAuth();

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be logged in to like a blog");
    }
    const newLikedState = !liked;
    // update UI before API call
    setLiked(newLikedState);
    setLikes((prev) => (newLikedState ? prev + 1 : prev - 1));
    setIsAnimating(true); // Trigger animation

    try {
      const response = await likeBlogAPI(id, newLikedState);
      if (response && response.success) {
        setLikes(response.likes);
        if (response.isLiked) {
          toast.success("Post has been liked");
        } else {
          toast.success("Post has been unliked");
        }
      }
    } catch (error) {
      console.error("Error updating like:", error);
      // revert UI on failure
      setLiked(!newLikedState);
      setLikes((prev) => (newLikedState ? prev - 1 : prev + 1));
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  }
  return (
    <div
      className={`flex items-center cursor-pointer ${liked ? 'text-red-500' : 'hover:text-red-500'}`}
      onClick={handleLike}
    >
      <Heart
        className={`w-4 h-4 ${liked ? 'fill-current' : ''}`}
      />
      <span className="ml-2 font-thin">{likes}</span>
    </div>
  )
}