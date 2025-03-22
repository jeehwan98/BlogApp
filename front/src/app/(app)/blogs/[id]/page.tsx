import BlogInfo from "@/components/blogs";
import { BlogContainer } from "@/components/blogs/components";

export default async function BlogPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <BlogContainer>
      <BlogInfo id={id} />
    </BlogContainer>
  )
}