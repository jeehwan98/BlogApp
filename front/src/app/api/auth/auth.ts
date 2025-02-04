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

    if (response.ok) {
      return responseData;
    }
  } catch (error) {
    console.error("Error during login", error);
    throw error;
  }
}

export async function logoutAPI() {
  try {
    const response = await fetch(URL.LOGOUT, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to log out");
    }

    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
}