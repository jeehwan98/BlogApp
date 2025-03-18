type FormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export default async function updateUserProfileAction(
  prevState: FormState,
  payload: FormData
): Promise<FormState> {

}