import { URL } from "@/lib/constants";

export async function postFeedbackAPI(email: string, feedback: string) {
  try {
    const response = await fetch(`${URL.FEEDBACK}/${email}`, {
      method: "POST",
      headers: URL.HEADERS,
      credentials: "include",
      body: feedback
    });

    if (!response.ok) {
      throw new Error("Failed to post feedback");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error posting feedback: ", error);
    throw error;
  }
}