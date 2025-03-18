import { LucideIcon } from "lucide-react";
import { RefObject } from "react";

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

export interface UserFormInputProps {
  name: string;
  placeholder: string;
  error?: string;
  value?: string;
  icon?: React.ComponentType<{ className?: string }>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface ImageUploadProps {
  name: string;
  previewUrl: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: () => void;
}