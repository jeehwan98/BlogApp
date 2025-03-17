export default function SpecificUserInfoPage({ params }: { params: { email: string } }) {
  const email = decodeURIComponent(params.email);

  return (
    <div>Users Profile Page: {email}</div>
  )
}