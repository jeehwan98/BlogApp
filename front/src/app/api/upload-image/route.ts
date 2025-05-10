import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// cloudinary configuration (server-side)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ensure that the environment variables are set
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Cloudinary configuration is missing environment variables");
}

// POST handler for uploading base64 images
export async function POST(request: Request) {
  try {
    const { base64Image } = await request.json();

    if (!base64Image || !base64Image.startsWith("data:image/")) {
      return NextResponse.json({ error: "Invalid image data" }, { status: 400 });
    }

    // upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "nextjs-course-mutations",
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}