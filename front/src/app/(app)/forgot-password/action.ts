import { forgotPasswordAPI } from "@/app/api/auth/auth";

type FormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export async function forgotPasswordAction(
  prevState: FormState,
  payload: FormData
): Promise<FormState> {

  const inputtedEmail = payload.get("email")?.toString() as string;
  const email = inputtedEmail.trim();

  console.log("inputted email?: ", email);
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
  // let response;
  // try {
  //   response = await forgotPasswordAPI(email);
  //   console.log("returned response?: ", response);
  // } catch (error) {
  //   console.error("Error resetting password:", error);
  //   return {
  //     success: false,
  //     errors: { email: "An error occurred. Please try again" }
  //   };
  // }

  // if (!response.success) {
  //   return {
  //     success: false,
  //     errors: { general: response.errors?.email }
  //   }
  // }

  // return { success: true };
} 