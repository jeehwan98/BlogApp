"use client"

import { useEffect, useState } from "react";
import ProfileAvatar from "../Avatar";
import { fetchUserAPI } from "@/app/api/user";
import { getUserEmail } from "@/lib/constants";
import { User } from "@/lib/interfaces";

export default function ProfileSection({ userId }: { userId: string }) {
  const [user, setUser] = useState<User>();
  console.log("params?: ", userId);

  useEffect(() => {
    const fetchUser = async () => {
      const email = getUserEmail(userId);
      const fetchedUser = await fetchUserAPI(email);
      setUser(fetchedUser);
    }
    fetchUser();
  }, []);

  return (
    <div className="flex items-center mb-10">
      <ProfileAvatar
        image={user?.image}
        name={user?.name}
        sx={{ width: 80, height: 80, marginRight: 2 }}
        fontSize={40}
      />
      <div className="ml-6">
        <h1 className="text-3xl font-bold">{user?.name}</h1>
        <p className="text-gray-500">{user?.email}</p>
      </div>
    </div>
  )
}