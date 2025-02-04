// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.JWT_SECRET || "secret-key";

// export async function getServerSession() {
//   const cookieStore = cookies();
//   const tokenObj = await cookieStore.get("accessToken");
//   const token = tokenObj?.value;

//   if (!token) return null;

//   try {
//     const user = jwt.verify(token, SECRET_KEY);
//     return user;
//   } catch (error) {
//     console.error("Invalid token", error);
//     return null;
//   }
// }

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = cookies(); // use await to get cookies properly
  const tokenObj = await cookieStore.get("accessToken"); // correct way to retrieve cookies
  const token = tokenObj?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new Error("JWT_SECRET_KEY is not set in .env");

    const decoded = jwt.verify(token, secretKey); // verify the token
    return NextResponse.json({ user: decoded });
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
