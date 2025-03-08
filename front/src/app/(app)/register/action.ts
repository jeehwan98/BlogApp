"use server"

import { redirect } from "next/navigation";
import { validateFormCheckPasswordInput, validateFormEmailInput, validateFormPasswordInput } from "@/lib/validation";
import { registerAPI } from "@/app/api/auth/register";
import { uploadImageToCloudinary } from "@/lib/image/cloudinary";
import { updateUserImageAPI } from "@/app/api/upload";

type FormState = {
  success: boolean;
  errors?: Record<string, string>;
}

export async function registerAction(
  prevState: FormState,
  payload: FormData
): Promise<FormState> {

  const email = payload.get("email")?.toString() as string;
  const name = payload.get("name")?.toString() || "" as string;
  const password = payload.get("password")?.toString() as string;
  const confirmPassword = payload.get("confirmPassword")?.toString() as string;
  const image = payload.get("image") as File;

  validateFormEmailInput(email as string);
  validateFormPasswordInput(password as string);
  validateFormCheckPasswordInput(password as string, confirmPassword as string);

  let response;

  try {
    response = await registerAPI({
      email,
      name,
      password,
      image: "",
    });
  } catch (error) {
    console.error("Registration error:", error);
    try {
      const errorObj = JSON.parse(error.message);
      if (errorObj.field && errorObj.message) {
        return {
          success: false,
          errors: { [errorObj.field]: errorObj.message },
        };
      }
    } catch (parseError) {
      const errorMessage = error.message || "An error occurred during registration.";
      return {
        success: false,
        errors: { general: errorMessage },
      };
    }
    return {
      success: false,
      errors: { general: "An error occurred during registration." },
    };
  }

  // check for successful registration
  if (!response.success) {
    return {
      success: false,
      errors: { email: response.error || "Invalid input" },
    };
  }

  // upload image upon successful user registration
  try {
    let uploadedImageUrl = "";
    if (image && image.size > 0) {
      uploadedImageUrl = await uploadImageToCloudinary(image);
      await updateUserImageAPI({ email, uploadedImageUrl });
    }
  } catch (error) {
    console.error("Error uploading image or updating user:", error);
    return {
      success: false,
      errors: { general: "Failed to upload image. Please try again." },
    };
  }

  redirect("/login");
}