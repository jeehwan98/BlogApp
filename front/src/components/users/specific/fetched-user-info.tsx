"use client"

import { fetchUserAPI } from "@/app/api/user";
import { User } from "@/interfaces/user";
import { useCallback, useEffect, useState } from "react";
import UserDetails from "./user-details";
import UserImage from "./user-image";

export default function FetchedUserInfo({ email }: { email: string }) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = useCallback(async () => {
    try {
      const fetchedUser = await fetchUserAPI(email);
      setUser(fetchedUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  console.log(user);

  if (loading) return <span>Loading ...</span>

  if (!user) return <p>Failed to load user details.</p>;
  return (
    <>
      <UserImage user={user} />
      <UserDetails user={user} />
    </>
  )
}