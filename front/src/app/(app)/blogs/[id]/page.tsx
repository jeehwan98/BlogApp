import BlogDetails from "@/components/IndividuallBlogPage/BlogDetails";

export default async function IndividualBlogPage({ params }: { params: { id: string } }) {
  const blogId = await params.id;

  return (
    <BlogDetails id={blogId} />
  )
}