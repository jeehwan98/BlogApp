export async function uploadImageToCloudinary(image: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", image);

  try {
    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Image upload failed");
  }
}