import { LoginDetails } from "@/interfaces/auth/login";
import { URL } from "@/lib/constants/url";

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
      // headers: {
      //   "Content-Type": "application/json",
      // },
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