import FetchedUserInfo from "@/components/users/specific/fetched-user-info";

export default function EditSpecificUserPage({ params }: { params: { email: string } }) {
  const email = decodeURIComponent(params.email);

  return (
    <div className="mt-10">
      <FetchedUserInfo email={email} />
    </div>
  )
}