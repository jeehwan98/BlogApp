export default async function IndividualBlogPage({ params }: { params: { id: string } }) {

  const res = await fetch(`http://localhost:8080/api/v1/blogs/${params.id}`, {
    cache: "no-store", // Prevent caching (optional)
  });

  if (!res.ok) {
    return <div>Blog not found</div>;
  }

  console.log("res:", res);

  return (
    <div>{params.id}</div>
  )
}