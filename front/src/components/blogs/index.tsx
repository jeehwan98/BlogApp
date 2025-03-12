"use client"

import { fetchBlogById } from "@/app/api/blog";
import { useEffect, useState } from "react";
import BlogContent from "./content";
import BlogInfo from "./blog-info";
import CommentSection from "./comment-section";
import Comments from "@/components/blogs/comments";
import SeparateLine from "@/components/ui/separate-line";
import { Blog } from "@/interfaces/blog";
import { BlogTitle } from "./components";

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
      <BlogTitle title={blogDetail.title} />
      <BlogInfo blogInfo={blogDetail} />
      <BlogContent content={blogDetail.content} />
      <SeparateLine />
      <CommentSection blogInfo={blogDetail} />
      <Comments blogInfo={blogDetail} />
    </div>
  )
}