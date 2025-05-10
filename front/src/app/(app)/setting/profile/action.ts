import { updateUserImageAPI } from "@/app/api/upload";
import { updateUserAPI, updateUserInfoAPI } from "@/app/api/user";
import { ERROR } from "@/lib/constants/statements";
import { uploadImageToCloudinary } from "@/lib/image/cloudinary";

type FormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  image?: string;
  name?: string;
}

export default async function updateUserProfileAction(
  prevState: FormState,
  payload: FormData
): Promise<FormState> {
  const changedName = payload.get("name")?.toString() as string;
  const initialName = payload.get("initialName")?.toString() as string;
  const initialEmail = payload.get("email")?.toString() as string;
  const image = payload.get("image");
  const initialImage = payload.get("initialImage")?.toString() as string;
  const initialRole = payload.get("initialRole")?.toString() as string;

  const isImageChanged = image instanceof File && image.size > 0;
  const isNameChanged = changedName !== initialName;

  if (!isImageChanged) console.log("image doesn't change");

  let updatedImage = "";
  // if no changes are detected, throw an error
  if (!isNameChanged && !isImageChanged) {
    return {
      success: false,
      message: "No changes detected",
      errors: { general: "No changes detected" },
    };
  }

  try {
    const updateData: { name: string; email: string; role: string; initialEmail: string; image?: string } = {
      name: changedName,
      email: initialEmail,
      role: initialRole,
      initialEmail: initialEmail,
    };

    let uploadedImageUrl = "";

    // if image was changed, change the image
    if (isImageChanged) {
      uploadedImageUrl = await uploadImageToCloudinary(image);
      const data = await updateUserImageAPI({ email: initialEmail, uploadedImageUrl });
      updatedImage = data.message; // get the returned saved image
    }

    await updateUserAPI(updateData);
    return {
      success: true,
      message: "User updated successfully",
      errors: {},
      name: changedName, // return updated name
      image: updatedImage || initialImage, // return updated image URL or initial if unchanged
    };
  } catch (error) {
    console.error("Error in updateUserAction:", error);
    return {
      success: false,
      message: "Failed to update user",
      errors: { general: error instanceof Error ? error.message : "Unknown error" },
    };
  }
}