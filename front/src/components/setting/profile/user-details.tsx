"use client"

import { User } from "@/interfaces/user";
import SettingUserImage from "./user-image";
import SettingUserName from "./user-name";
import updateUserProfileAction from "@/app/(app)/setting/profile/action";
import { useActionState, useEffect, useState } from "react";
import { SettingsProfileButton } from "../components";
import { toast } from "sonner";
import { ERROR } from "@/lib/constants/statements";
import { HiddenInputs } from "./components";
import { useRouter } from "next/navigation";

export default function SettingsUserDetails({ user }: { user: User }) {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(user.image || null); // for image preview
  const [formData, setFormData] = useState<{ name: string; image: string; password: string }>({
    name: user.name || "",
    image: user.image || "",
    password: "",
  });
  const [state, formAction, isPending] = useActionState(updateUserProfileAction, {
    success: false,
    message: "",
    errors: {},
  });
  const [prevState, setPrevState] = useState(state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => {
    const { name, value } = "target" in e ? e.target : e;

    if ("target" in e && e.target?.type === "file") {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file); // preview URL
        setPreviewUrl(imageUrl);
        // setFormData((prev) => ({ ...prev, image: imageUrl })); // update formData.image
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (state.success && !prevState.success) {
      toast.success("Profile updated successfully!", {
        description: "Your user information has been updated.",
      });
      // reset formData upon successful user update to disable the button
      setFormData({
        name: state.name || user.name || "",
        image: state.image || user.image || "",
        password: "",
      });
      setPreviewUrl(state.image || user.image || null);
      router.refresh();
    } else if (state.message && !state.success && prevState.success !== state.success) {
      toast.error(ERROR.SOMETHING_WENT_WRONG, {
        description: state.message || ERROR.UPDATE_USER_INFO,
      });
    }
    setPrevState(state); // update prevState after checking
  }, [state, prevState, user, router]);

  const isChanged = formData.name !== user.name || formData.image; // check both name and image
  console.log("name in formDat", formData.name);
  console.log("name in user", user.name);

  return (
    <form action={formAction}>
      <SettingUserImage
        user={user}
        formData={formData}
        onChange={handleChange}
        previewUrl={previewUrl}
      />
      <SettingUserName
        user={user}
        formData={formData}
        onChange={handleChange}
      />
      <HiddenInputs user={user} />
      <SettingsProfileButton
        isPending={isPending}
        isChanged={isChanged}
      />
    </form>
  )
}