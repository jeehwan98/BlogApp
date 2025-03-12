import BlogInfo from "@/components/blogs";
import BlogContainer from "@/components/blogs/BlogContainer";

export default async function BlogPage({ params }: { params: { id: string } }) {
  const blogId = await params.id;

  return (
    <BlogContainer>
      <BlogInfo id={blogId} />
    </BlogContainer>
  )
}