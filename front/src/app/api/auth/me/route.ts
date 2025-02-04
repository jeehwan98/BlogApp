import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/lib/interfaces";

export async function GET() {
  const token = cookies().get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    console.log("decoded", decoded);
    return NextResponse.json({ decoded });
  } catch (error) {
    console.error("error decoding token:", error);
    return NextResponse.json({ error: "invalid token" }, { status: 401 });
  }
}