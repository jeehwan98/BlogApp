"use client"

import { fetchBlogById } from "@/app/api/blog";
import { Blog } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export default function BlogDetails({ id }: { id: string }) {
  const [blogDetail, setBlogDetail] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await fetchBlogById(id);
        setBlogDetail(fetchedBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>
  }

  if (!blogDetail) {
    return <div>Failed to load blog details.</div>
  }

  return (
    <div className="flex-1 p-4">
      <h3 className="text-xl font-bold truncate">{blogDetail.title}</h3>
      <p
        className="text-sm text-gray-700 mt-2 overflow-hidden line-clamp-6"
        dangerouslySetInnerHTML={{ __html: blogDetail.content }}
      />
    </div>
  )
}