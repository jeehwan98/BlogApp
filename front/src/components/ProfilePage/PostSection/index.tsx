"use client"

import ProfileBlogCard from "../ProfileBlogCard";
import { fetchBlogByUserAPI } from "@/app/api/blog";
import { getUserEmail } from "@/lib/constants";
import { Blog } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export default function PostSection({ userId }: { userId: string }) {
  const [blogs, setBlogs] = useState<Blog[]>();

  useEffect(() => {
    const fetchBlog = async () => {
      const email = getUserEmail(userId);
      const fetchedBlog = await fetchBlogByUserAPI(email);
      console.log("fetched blog?: ", fetchedBlog);
      setBlogs(fetchedBlog);
    }
    fetchBlog();
  }, []);

  return (
    <div className="grid gap-6">
      {blogs?.map((blog) => (
        <ProfileBlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}