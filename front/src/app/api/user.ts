import { URL } from "@/lib/constants";

export async function fetchUserAPI(email: string) {
  try {
    const response = await fetch(`${URL.FETCH_USER}/${email}`, {
      method: "GET",
      headers: URL.HEADERS,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
}