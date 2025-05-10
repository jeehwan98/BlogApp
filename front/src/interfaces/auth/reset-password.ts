export interface ResetPasswordProps {
  success: boolean;
  errors: {
    password?: string;
    confirmPassword: string;
    general?: string;
  }
}