import { checkPasswordAPI, updatePasswordAPI } from "@/app/api/auth/auth";
import { validateFormCheckPasswordInput, validateFormPasswordInput } from "@/lib/validation";

type FormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export async function securityAction(
  prevState: FormState,
  payload: FormData
): Promise<FormState> {

  const password = payload.get("password")?.toString() as string;
  const confirmPassword = payload.get("confirmPassword")?.toString() as string;
  const currentPassword = payload.get("currentPassword")?.toString() as string;

  validateFormPasswordInput(password as string);
  validateFormCheckPasswordInput(password as string, confirmPassword as string);

  const checkPasswordResponse = await checkPasswordAPI(currentPassword);

  if (!checkPasswordResponse.success) {
    return {
      success: false,
      errors: {
        currentPassword: "Current password is incorrect"
      }
    };
  }

  const updatePasswordResponse = await updatePasswordAPI(password);
  if (updatePasswordResponse.success) {
    return {
      success: true,
      message: updatePasswordResponse.message
    };
  } else {
    return {
      success: false,
      errors: {
        general: "Failed to update password"
      }
    };
  }
}