import { SettingsProfileContainer, SettingsProfileTitle } from "@/components/setting/components";
import SettingsUserDetails from "@/components/setting/profile/user-details";
import { getServerSession } from "@/lib/auth/auth-server"

export default async function SettingProfilePage() {
  const user = await getServerSession();

  if (!user) {
    return ("/");
  }

  return (
    <SettingsProfileContainer>
      <SettingsProfileTitle />
      <SettingsUserDetails user={user} />
    </SettingsProfileContainer>
  )
}