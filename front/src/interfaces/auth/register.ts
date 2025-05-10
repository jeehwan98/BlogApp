export interface RegisterStateProps {
  success: boolean;
  errors: {
    name?: string;
    email?: string;
    password?: string;
    image: string;
    confirmPassword: string;
    general?: string;
  }
}

export interface RegisterDetails {
  image: File | "";
  email: string;
  password: string;
  name: string;
}