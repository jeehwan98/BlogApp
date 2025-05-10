import FetchedUserInfo from "@/components/users/specific/fetched-user-info";

export default async function SpecificUserInfoPage({ params }: { params: { email: string } }) {
  params = await params;
  const preDecodedEmail = params.email;
  const email = decodeURIComponent(preDecodedEmail);

  return (
    <div className="mt-10">
      <FetchedUserInfo email={email} />
    </div>
  )
}