"use client"

import { fetchUserAPI } from "@/app/api/user";
import { User } from "@/interfaces/user";
import { useActionState, useCallback, useEffect, useState } from "react";
import UserDetails from "./user-details";
import UserImage from "./user-image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import updateUserAction from "@/app/(app)/users/[email]/edit/action";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function FetchedUserInfo({ email }: { email: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<{ name: string; email: string; role: string }>({
    name: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(pathname.endsWith("/edit"));

  const [state, formAction, isPending] = useActionState(updateUserAction, {
    success: false,
    message: "",
    errors: {},
  });

  const fetchUser = useCallback(async () => {
    try {
      const fetchedUser = await fetchUserAPI(email);
      setUser(fetchedUser);
      setFormData({
        name: fetchedUser.name || "",
        email: fetchedUser.email || "",
        role: fetchedUser.role || "",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (state.success) {
      setIsEditing(false);
      router.push(`/users/${encodeURIComponent(email)}`); // redirect to non-edit URL after success
      fetchUser();
    }
  }, [state.success, fetchUser, email, router]);

  useEffect(() => {
    setIsEditing(pathname.endsWith("/edit")); // update isEditing when pathname changes
  }, [pathname]);

  const handleEditClick = () => {
    router.push(`/users/${encodeURIComponent(email)}/edit`); // navigate to /edit URL
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => {
    const { name, value } = "target" in e ? e.target : e;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <span>Loading ...</span>;

  if (!user) return <p>Failed to load user details.</p>;

  return (
    <form action={formAction}>
      <div className="flex">
        <UserImage user={user} />
        <UserDetails
          user={user}
          formData={formData}
          onChange={handleChange}
          isEditing={isEditing}
          state={state}
        />
      </div>
      {/* Updated values */}
      <input type="hidden" name="name" value={formData.name} />
      <input type="hidden" name="email" value={formData.email} />
      <input type="hidden" name="role" value={formData.role} />
      {/* Initial values */}
      <input type="hidden" name="initialName" value={user.name || ""} />
      <input type="hidden" name="initialEmail" value={user.email || ""} />
      <input type="hidden" name="initialRole" value={user.role || ""} />
      <div className="fixed bottom-0 left-0 w-full flex justify-between items-end px-4 py-3 z-10">
        <Link
          href="../"
          className="text-black px-4 py-2 rounded-md flex items-center hover:bg-gray-100"
        >
          나가기
        </Link>
        <Button
          type={isEditing ? "submit" : "button"}
          onClick={!isEditing ? handleEditClick : undefined}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isEditing ? (
            "Submit"
          ) : (
            "수정"
          )}
        </Button>
      </div>
    </form>
  );
}