"use client"

import useEditStore from "@/lib/zustand/post"
import React from "react";
import { Divider, EditTitleContainer } from "./components";

export default function EditTitle() {
  const { post, addTitle } = useEditStore();

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    addTitle(e.target.value);
  }

  return (
    <EditTitleContainer>
      <input
        type="text"
        name='title'
        placeholder="제목을 입력하세요"
        value={post.title}
        onChange={handleTitleInput}
        className="w-full text-4xl font-bold p-2 outline-none bg-transparent overscroll-auto"
      />
      <Divider />
    </EditTitleContainer>
  )
}