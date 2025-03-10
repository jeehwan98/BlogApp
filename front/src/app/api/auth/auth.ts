import { LoginDetails } from "@/interfaces/auth/login";
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
    const response = await fetch("http://localhost:8080/api/v1/auth/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(email),
    });

    const responseData = await response.json();

    console.log(responseData);

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
  // try {
  //   const response = await fetch("http://localhost:3000/api/v1/auth/forgot-password", {
  //     method: "POST",
  //     headers: URL.HEADERS,
  //     body: JSON.stringify(email),
  //     credentials: "include",
  //   });

  //   const responseData = await response.json();
  //   console.log("response data?: ", responseData);

  //   if (!response.ok) {
  //     return {
  //       success: false,
  //       error: responseData.error || "User doesn't exist"
  //     };
  //   }

  //   if (!responseData.success) {
  //     return {
  //       success: false,
  //       error: responseData.error
  //     }
  //   }

  //   return {
  //     success: true,
  //     message: responseData.message,
  //   };
  // } catch (error) {
  //   console.error("Error during login", error);
  //   throw error;
  // }
}