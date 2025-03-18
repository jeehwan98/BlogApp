"use client"

import ProfileAvatar from "@/components/avatar";
import { User } from "@/interfaces/user";

export default function UserImage({ user }: { user: User }) {
  return (
    <div className="w-1/3 align-center">
      <ProfileAvatar
        image={user.image}
        name={user.name}
        sx={{ width: 200, height: 200 }}
        fontSize={130}
      />
    </div>
  )
}