import { updateUserAPI } from "@/app/api/user";
import { Role } from "@/interfaces/user";

type FormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export default async function updateUserAction(
  prevState: FormState,
  payload: FormData
): Promise<FormState> {

  const changedName = payload.get("name")?.toString() as string;
  const changedRole = payload.get("role")?.toString() as string;
  const changedEmail = payload.get("email")?.toString() as string;
  const initialName = payload.get("initialName")?.toString() as string;
  const initialRole = payload.get("initialRole")?.toString() as string;
  const initialEmail = payload.get("initialEmail")?.toString() as string;

  // validation (example)
  if (changedName === initialName && changedRole === initialRole && changedEmail === initialEmail) {
    return {
      success: false,
      message: "Values are the same as initial",
      errors: {
        general: "Values are the same as initial"
      },
    };
  }

  // validate required fields
  if (!changedName || !changedEmail || !changedRole) {
    return {
      success: false,
      message: "Missing required fields",
      errors: {
        name: !changedName ? "Name is required" : "",
        email: !changedEmail ? "Email is required" : "",
        role: !changedRole ? "Role is required" : "",
      },
    };
  }

  // validate role against enum
  if (!Object.values(Role).includes(changedRole as Role)) {
    return {
      success: false,
      message: "Invalid role",
      errors: {
        role: "Role must be one of: " + Object.values(Role).join(", "),
      },
    };
  }

  try {
    await updateUserAPI({ name: changedName, email: changedEmail, role: changedRole, initialEmail: initialEmail });
    return {
      success: true,
      message: "User updated successfully",
      errors: {},
    };
  } catch (error) {
    console.error("Error in updateUserAction: ", error);
    return {
      success: false,
      message: "Failed to update user",
      errors: {},
    };
  }
}