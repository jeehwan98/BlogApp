"use client"

import ProfileAvatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/interfaces/user";
import { useRef } from "react";

export default function SettingUserImage({
  user,
  formData,
  onChange,
  previewUrl,
}: {
  user: User;
  formData: { name: string; image: string | File; password: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => void;
  previewUrl: string | null;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex border w-full pb-5" >
      <div className="w-1/5">
        <div className="px-7 py-10">프로필 사진</div>
      </div>
      <div className="w-1/4 flex justify-center items-center align-middle">
        <div className="">
          <ProfileAvatar
            image={previewUrl || user?.image}
            name={user.name}
            sx={{
              width: { xs: 100, sm: 150, md: 180 },
              height: { xs: 100, sm: 150, md: 180 },
              fontSize: { xs: 60, sm: 90, md: 130 },
              margin: 3
            }}
            fontSize={130}
          />
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            onChange={onChange}
            accept="image/*"
            className="hidden"
          />
          <div className="flex justify-center items-center align-middle">
            <Button type="button" onClick={triggerFileInput} className="mt-2">
              Change Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// <FormImageInput
//   name="image"
//   previewUrl={previewUrl}
//   fileInputRef={fileInputRef}
//   handleImageChange={handleImageChange}
//   triggerFileInput={triggerFileInput}
// />