import BlogInfo from "@/components/blogs";
import { BlogContainer } from "@/components/blogs/components";

export default async function BlogPage({ params }: { params: { id: string } }) {
  const blogId = params.id;

  return (
    <BlogContainer>
      <BlogInfo id={blogId} />
    </BlogContainer>
  )
}