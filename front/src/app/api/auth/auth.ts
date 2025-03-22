"use server"

import { LoginDetails } from "@/interfaces/auth/login";
import { URL } from "@/lib/constants/url";
import { cookies } from "next/headers";

export async function loginAPI(data: LoginDetails) {
  try {
    const response = await fetch(URL.LOGIN, {
      method: "POST",
      headers: URL.HEADERS,
      body: JSON.stringify(data),
      credentials: "include",
    });

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      return {
        success: false,
        error: responseData.error || "Login failed"
      };
    }

    if (!responseData.success) {
      return {
        success: false,
        error: responseData.error
      }
    }

    return {
      success: true,
      message: responseData.message,
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken
    };

  } catch (error) {
    console.error("Error during login", error);
    throw error;
  }
}

export async function forgotPasswordAPI(email: string) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/auth/forgot-password/${email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
    });

    const responseData = await response.json();

    console.log("response from forgot password action", responseData);

    if (!response.ok || !responseData.success) {
      console.log("error");
      return {
        success: false,
        errors: { email: responseData.error || "Email doesn't exist" },
      };
    }

    console.log("responseData?: ", responseData);
    return {
      success: true,
      message: responseData.message || "Password reset link sent to your email",
    };
  } catch (error) {
    console.error("Error during forgot password request:", error);
    return {
      success: false,
      errors: { email: "Something went wrong. Please try again." },
    };
  }
}

export async function resetPasswordAPI(token: string, password: string) {
  const formData = new FormData();
  formData.append("token", token);
  formData.append("password", password);

  let responseData;
  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/reset-password", {
      method: "POST",
      body: formData,
    });

    responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        errors: { general: responseData.error || "Failed to reset password." },
      };
    }

    return {
      success: true,
      message: responseData.message,
    };
  } catch (error) {
    console.error("Error resetting password:", error);
    return {
      success: false,
      errors: { general: responseData.error },
    };
  }
}

export async function checkPasswordAPI(currentPassword: string) {
  let responseData;
  try {
    const response = await fetch(`http://localhost:8080/api/v1/auth/password?password=${encodeURIComponent(currentPassword)}`, {
      method: "GET",
      headers: { Cookie: cookies().toString() },
    });

    responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        errors: { confirmPassword: responseData.error || "Failed to reset password." },
      };
    }

    console.log("responseData:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error checking password:", error);
    return {
      success: false,
      errors: { general: responseData.error },
    };
  }
}

export async function updatePasswordAPI(inputtedPassword: string) {
  let responseData;
  try {
    const response = await fetch(`http://localhost:8080/api/v1/auth/password?password=${encodeURIComponent(inputtedPassword)}`, {
      method: "PUT",
      headers: { Cookie: cookies().toString() },
    });

    responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        errors: { confirmPassword: responseData.error || "Failed to update password." },
      };
    }

    console.log("responseData:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error checking password:", error);
    return {
      success: false,
      errors: { general: responseData.error },
    };
  }
}