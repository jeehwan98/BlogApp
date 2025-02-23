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

export async function updateIntroductionAPI(email: string, introduction: string) {
  try {
    const response = await fetch(`${URL.FETCH_USER}/${email}`, {
      body: JSON.stringify({ introduction }),
      method: "PUT",
      headers: URL.HEADERS,
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error("Error updating user introduction:");
    }

    console.log("responseData?:", responseData.success);
    return responseData;
  } catch (error) {
    console.error("Error updating introduction:", error);
    throw error;
  }
}