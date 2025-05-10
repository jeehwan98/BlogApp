"use server"

import { cookies } from "next/headers";
import { validateFormEmailInput, validateFormPasswordInput } from "@/lib/constants/validation";
import { loginAPI } from "@/app/api/auth/auth";

type FormState = {
  success: boolean;
  errors?: Record<string, string>;
}

export async function loginAction(
  prevState: FormState,
  payload: FormData
): Promise<FormState> {

  const email = payload.get("email")?.toString() as string;
  const password = payload.get("password")?.toString() as string;

  try {
    validateFormEmailInput(email);
    validateFormPasswordInput(password);
  } catch (error) {
    const errorMessage = (error as Error)?.message || "An error occurred during validation.";
    return {
      success: false,
      errors: { general: errorMessage },
    };
  }

  let response;

  try {
    response = await loginAPI({
      email,
      password
    });
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      errors: { general: "An error occurred. Please try again." },
    };
  }

  if (!response.success) {
    return {
      success: false,
      errors: { general: response.error }
    }
  }

  // set token in the cookies here
  if (response.accessToken && response.refreshToken) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", response.accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60,
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", response.refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "lax",
    });
  } else {
    console.error("Tokens not found in backend response");
    return {
      success: false,
      errors: { general: "Failed to retrieve tokens from backend" },
    };
  }

  return { success: true };
} 