import FetchedUserInfo from "@/components/users/specific/fetched-user-info";

export default function SpecificUserInfoPage({ params }: { params: { email: string } }) {
  const email = decodeURIComponent(params.email);

  return (
    <div className="flex">
      <FetchedUserInfo email={email} />
    </div>
    // <div>Users Profile Page: {email}</div>
  )
}