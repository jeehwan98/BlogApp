import { BlogLikes } from "./blog-likes";

export interface User {
  id: number;
  email: string;
  name: string;
  image: string;
  introduction: string;
  role: string;
  likes: BlogLikes;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  error: string | null;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface UpdateUserImageProps {
  email: string;
  uploadedImageUrl: string;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export interface UpdateUserProps {
  name: string;
  email: string;
  role: string;
}