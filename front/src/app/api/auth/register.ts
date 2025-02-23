import { RegisterDetails } from "@/lib/interfaces";
import { URL } from "@/lib/constants";

export async function registerAPI(data: RegisterDetails) {
  console.log("inputted data?:", data);
  try {
    const response = await fetch(URL.REGISTER_USER_EMAIL, {
      method: "POST",
      headers: URL.HEADERS,
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error || "Registration failed");
    }
    const user = responseData.user;
    console.log("user?:", user);
    return user;
  } catch (error) {
    console.error("Error during registration", error);
    throw error;
  }
}