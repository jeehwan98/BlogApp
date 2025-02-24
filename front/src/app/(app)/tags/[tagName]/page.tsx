"use client"

import { useParams } from "next/navigation"

export default function TagsPage() {
  const params = useParams();
  const tag = params?.tagName as string;

  return (
    <>
      <div>Tags Page</div>
      <div>{tag}</div>
    </>
  )
}