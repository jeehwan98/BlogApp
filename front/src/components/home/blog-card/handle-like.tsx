"use client"

import { Heart } from "lucide-react";
import { useState } from "react";

export default function HandleLike({ id }: { id: number }) {
  const [liked, setLiked] = useState<boolean>(false);

  const handleLike = (id: number) => {
    console.log("handleLike clicked");
  }
  return (
    <div
      className="flex justify-between align-center items-center hover:text-red-500 cursor-pointer"
      onClick={() => handleLike(id)}
    >
      <Heart
        className="w-4 h-4"
      />
      <span className="ml-2 font-thin">0</span>
    </div>
  )
}