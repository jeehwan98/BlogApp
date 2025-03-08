import { User } from "@/lib/interfaces/user";
import { headers } from "next/headers";

export async function getServerSession(): Promise<User | null> {
  const headersData = await headers();
  const cookie = headersData.get("cookie") || "";
  try {
    const response = await fetch("http://localhost:8090/api/v1/auth/current", {
      headers: { Cookie: cookie },
      credentials: "include",
      cache: "no-store", // ensure fresh data
    });

    if (!response.ok) {
      // console.log("Failed to fetch current user, status: ", response.status);
      // console.log("Response headers: ", response.headers);
      const text = await response.text();
      // console.log("Response body: ", text);
      return null;
    }

    if (response.ok) {
      const responseData = await response.json();
      return responseData as User;
    }
    return null; // return null if not authenticated (e.g., 401)
  } catch (error) {
    console.error("Error fetching server user:", error);
    return null;
  }
}