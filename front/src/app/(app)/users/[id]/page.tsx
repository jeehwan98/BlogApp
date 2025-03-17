export default function SpecificUserInfoPage({ params }: { params: { id: number } }) {
  const id = params.id;

  return (
    <div>Users Profile Page: {id}</div>
  )
}