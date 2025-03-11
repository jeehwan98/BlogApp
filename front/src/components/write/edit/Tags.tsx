"use client"

import useEditStore from "@/lib/zustand/post"
import React, { useState } from "react";
import { EditTagContainer } from "./components";
import { Button } from "@/components/ui/Button";

export default function EditTags() {
  const { post, addTags } = useEditStore();
  const [currentTag, setCurrentTag] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false);


  const handleTagsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  }

  const handleCompositionStart = () => {
    setIsComposing(true);
  }

  const handleCompositionEnd = () => {
    setIsComposing(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing && currentTag.trim() !== "") {
      e.preventDefault();
      addTags([...post.tags, currentTag.trim()]);
      setCurrentTag("");
    }

    if (e.key === "Backspace" && currentTag === "") {
      if (post.tags.length > 0) {
        addTags(post.tags.slice(0, -1));
      }
    }
  };

  const handleBlur = () => {
    if (currentTag.trim() !== "") {
      addTags([...post.tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (index: number) => {
    console.log("removing tag at index", index);
    const updatedTags = post.tags.filter((_, i) => i !== index);
    console.log("updated tags::", updatedTags);
    addTags(updatedTags);
  };

  return (
    <EditTagContainer>
      {post.tags.map((tag, index) => (
        <Button
          variant="ghost"
          key={index}
          className="flex items-center bg-gray-50 text-gray-800 rounded-lg px-3 py-1 text-base cursor-pointer hover:bg-gray-200"
          onClick={() => removeTag(index)}
        >
          {tag}
        </Button>
      ))}
      <input
        type="text"
        name="tags"
        placeholder="태그를 입력하세요"
        className="flex-grow text-xl outline-none bg-transparent pl-2"
        value={currentTag}
        onChange={handleTagsInput}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
    </EditTagContainer>
  )
}