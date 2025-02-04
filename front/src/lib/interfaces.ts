export interface RegisterDetails {
  email: string;
  password: string;
  name: string;
  provider: string;
}

export interface LoginDetails {
  email: string;
  password: string;
}

export interface DecodedToken {
  name: string;
  email: string;
  image?: string;
  role?: string;
}