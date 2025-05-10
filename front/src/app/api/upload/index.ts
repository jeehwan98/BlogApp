import { UpdateUserImageProps } from "@/interfaces/user";

export async function updateUserImageAPI({
  email,
  uploadedImageUrl: image
}: UpdateUserImageProps) {

  console.log("updated image url?: ", image);
  try {
    const response = await fetch("http://localhost:8080/api/v1/user/image", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, image }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to update user image");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating user image:", error);
    throw error;
  }
}