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

  if (!inputtedEmail) {
    return {
      success: false,
      errors: {
        email: "Email is required"
      }
    };
  }

  return forgotPasswordAPI(inputtedEmail);
} 