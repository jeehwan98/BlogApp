"use client"

import ProfileAvatar from "@/components/avatar";
import { User } from "@/interfaces/user";

export default function UserProfileSettings({ user }: { user: User }) {
  return (
    <div className="flex border w-full items-center justify-center align-middle">
      <div className="w-1/3">
        <div className="px-5 py-5">프로필 사진</div>
      </div>
      <div className="w-2/3">
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

  )
}