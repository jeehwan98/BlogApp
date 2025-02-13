"use client"

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { RegisterDetails } from "@/lib/interfaces";
import { registerAPI } from "@/app/api/auth/register";
import InputField from "@/components/UI/InputField";
import { Button } from "@/components/UI/Button";
import { RegisterBottomNav } from "../RegisterBottomNav";
import Image from "next/image";
import defaultCameraImage from "../../../../public/images/default-photo.jpg";
import { uploadImage } from "@/lib/uploadImage";

export default function RegisterForm() {
  const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
    image: "",
    email: "",
    password: "",
    name: "",
    provider: ""
  });
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [registerError, setRegisterError] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a preview URL
      setPreviewUrl(imageUrl);
      setRegisterDetails((prev) => ({ ...prev, image: file }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);

    if (checkPassword !== registerDetails.password) {
      setRegisterError("Passwords do not match");
      return;
    }

    try {
      let uploadedImageUrl = "";

      if (registerDetails.image instanceof File) {
        uploadedImageUrl = await uploadImage(registerDetails.image);
      }
      const response = await registerAPI({
        image: uploadedImageUrl,
        email: registerDetails.email,
        password: registerDetails.password,
        name: registerDetails.name,
        provider: "email"
      });

      if (response?.error) {
        setRegisterError(response.error);
      } else {
        console.log("register successful:", response);
        router.push("/login");
      }
    } catch (error) {
      setRegisterLoading(false);
      console.error("error occurred while logging in: ", error);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative w-40 h-40 mx-auto mb-24">
          {/* Profile Image */}
          <Image
            className="object-cover w-full h-full rounded-full"
            src={previewUrl || defaultCameraImage}
            width={200}
            height={200}
            alt="Profile Image"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <div className="flex flex-col items-center mt-2">
            <Button
              type="button"
              onClick={triggerFileInput}
              className="mt-2"
            >
              Upload
            </Button>
          </div>
        </div>

        <InputField
          type="text"
          name="name"
          placeholder="Name"
          value={registerDetails.name}
          onChange={(e) => setRegisterDetails({ ...registerDetails, name: e.target.value })}
        />
        <InputField
          type="text"
          name="email"
          placeholder="example@email.com"
          value={registerDetails.email}
          onChange={(e) => setRegisterDetails({ ...registerDetails, email: e.target.value })}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={registerDetails.password}
          onChange={(e) => setRegisterDetails({ ...registerDetails, password: e.target.value })}
        />
        <InputField
          type="password"
          name="checkPassword"
          placeholder="Check Password"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />
        {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
        <Button
          type="submit"
          disabled={registerLoading}
          className="w-full"
        >
          {registerLoading ? 'Registering...' : 'Register'}
        </Button>
        <RegisterBottomNav />
      </form>
    </div>
  )
}