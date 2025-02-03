import { LoginDetails } from "@/lib/interfaces";
import { URL } from "@/lib/constants";

export async function loginAPI(data: LoginDetails) {
  try {
    const response = await fetch(URL.LOGIN, {
      method: "POST",
      headers: URL.HEADERS,
      body: JSON.stringify(data),
      credentials: "include",
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error || "Login failed");
    }
    return responseData;
  } catch (error) {
    console.error("Error during login", error);
    throw error;
  }
}

export async function logoutAPI() {
  localStorage.removeItem("token");
}