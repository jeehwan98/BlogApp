import { URL } from "@/lib/constants/url";

export async function postFeedbackAPI(email: string, feedback: string) {
  try {
    const response = await fetch(`${URL.FEEDBACK}/${email}`, {
      method: "POST",
      headers: URL.HEADERS,
      credentials: "include",
      body: JSON.stringify(feedback)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response not OK: ", response.status, errorText);
      throw new Error("Failed to post feedback");
    }

    const responseData = await response.json();
    console.log("success message?: ", responseData.success);
    return responseData;
  } catch (error) {
    console.error("Error posting feedback: ", error);
    throw error;
  }
}

export async function fetchFeedbackAPI() {
  try {
    const response = await fetch(URL.FEEDBACK, {
      method: "GET",
      headers: URL.HEADERS,
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response not OK: ", response.status, errorText);
      throw new Error("Failed to get feedback");
    }

    const responseData = await response.json();
    return responseData.result;
  } catch (error) {
    console.error("Error posting feedback: ", error);
    throw error;
  }
}