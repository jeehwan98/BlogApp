import { UsersInfoTitle } from "@/components/users/components";
import UsersInfo from "@/components/users/users-info";
import { getServerSession } from "@/lib/auth/auth-server";

export default async function UsersPage() {
  const user = await getServerSession();

  if (!user) {
    return ("/");
  }

  if (user.role !== "ADMIN") {
    alert("Only admins can access this page");
  }

  return (
    <>
      <UsersInfoTitle />
      <UsersInfo />
    </>
  )
}