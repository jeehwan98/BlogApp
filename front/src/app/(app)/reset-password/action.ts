import { validateFormCheckPasswordInput, validateFormPasswordInput } from "@/lib/validation";
import { resetPasswordAPI } from "@/app/api/auth/auth";

type FormState = {
  success: boolean;
  errors?: Record<string, string>;
}

export async function resetPasswordAction(
  prevState: FormState,
  payload: FormData
): Promise<FormState> {

  const password = payload.get("password")?.toString() as string;
  const confirmPassword = payload.get("confirmPassword")?.toString() as string;
  const token = payload.get("token")?.toString() as string;

  validateFormPasswordInput(password as string);
  validateFormCheckPasswordInput(password as string, confirmPassword as string);

  const response = await resetPasswordAPI(token, password);
  console.log(response);
  return response;
}