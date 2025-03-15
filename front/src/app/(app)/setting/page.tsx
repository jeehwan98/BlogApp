import { getServerSession } from "@/lib/auth/auth-server";

export default async function SettingPage() {
  const user = await getServerSession();

  return (
    <div>
      <h1>Settings Page</h1>
      <h1>{user?.name}</h1>
    </div>
  );
}