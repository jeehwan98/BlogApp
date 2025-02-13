import BlogInfo from "@/components/IndividualBlogPage";
import BlogContainer from "@/components/IndividualBlogPage/BlogContainer";

export default async function IndividualBlogPage({ params }: { params: { id: string } }) {
  const blogId = await params.id;

  return (
    <BlogContainer>
      <BlogInfo id={blogId} />
    </BlogContainer>
  )
}