import BlogDetails from "@/components/IndividuallBlogPage";
import BlogContainer from "@/components/IndividuallBlogPage/Components";

export default async function IndividualBlogPage({ params }: { params: { id: string } }) {
  const blogId = await params.id;

  return (
    <BlogContainer>
      <BlogDetails id={blogId} />
    </BlogContainer>
  )
}