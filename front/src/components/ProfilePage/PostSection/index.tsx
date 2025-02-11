"use client"

import ProfileBlogCard from "../ProfileBlogCard";
import { fetchBlogByUserAPI } from "@/app/api/blog";
import { convertIdToEmail } from "@/lib/constants";
import { Blog } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export default function PostSection({ userId }: { userId: string }) {
  const [blogs, setBlogs] = useState<Blog[]>();

  useEffect(() => {
    const fetchBlog = async () => {
      const email = convertIdToEmail(userId);
      const fetchedBlog = await fetchBlogByUserAPI(email);
      setBlogs(fetchedBlog);
    }
    fetchBlog();
  }, [userId]);

  return (
    <div className="grid gap-6">
      {blogs?.map((blog) => (
        <ProfileBlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}