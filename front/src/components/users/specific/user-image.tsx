"use client"

import ProfileAvatar from "@/components/avatar";
import { User } from "@/interfaces/user";

export default function UserImage({ user }: { user: User }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 flex justify-center items-center p-4">
      <ProfileAvatar
        image={user.image}
        name={user.name}
        sx={{
          width: { xs: 100, sm: 150, md: 200 },
          height: { xs: 100, sm: 150, md: 200 },
          fontSize: { xs: 60, sm: 90, md: 130 },
        }}
        fontSize={130}
      />
    </div>
  )
}