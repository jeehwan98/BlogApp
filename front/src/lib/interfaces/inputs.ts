import { LucideIcon } from "lucide-react";

export interface PasswordInputProps {
  name: string;
  placeholder: string;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  error?: string;
}

export interface FormInputProps {
  name: string;
  placeholder: string;
  error?: string;
  icon?: LucideIcon
}


export interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
