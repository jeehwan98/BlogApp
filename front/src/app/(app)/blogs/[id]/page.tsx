export default function IndividualBlogPage({
  params
}: {
  params: { id: string }
}) {
  return (
    <div>{params.id}</div>
  )
}