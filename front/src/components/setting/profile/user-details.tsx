import ProfileAvatar from "@/components/avatar";
import { FormInputWithoutLabel } from "@/components/ui/input";
import { User } from "@/interfaces/user";
import { User as UserIcon } from "lucide-react";

export default function SettingsUserDetails({ user }: { user: User }) {
  return (
    <>
      <div className="flex border w-full">
        <div className="w-1/5">
          <div className="px-7 py-10">프로필 사진</div>
        </div>
        <div className="w-1/4">
          <ProfileAvatar
            image={user?.image}
            name={user.name}
            sx={{
              width: { xs: 100, sm: 150, md: 200 },
              height: { xs: 100, sm: 150, md: 200 },
              fontSize: { xs: 60, sm: 90, md: 130 },
            }}
            fontSize={130}
          />
        </div>
      </div>
      <div className="flex border w-full">
        <div className="w-1/5">
          <div className="px-7 py-10">이름</div>
        </div>
        <div className="w-1/4 flex">
          <div className="flex align-middle justify-center items-center">
            <FormInputWithoutLabel
              name="name"
              placeholder="John Doe"
              value={user.name}
              // error={state?.errors?.name}
              icon={UserIcon}
            />
          </div>
        </div>
      </div>
    </>


  )
}