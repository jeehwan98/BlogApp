export interface User {
  email: string,
  name: string,
  image: string,
  bio: string,
  role: string,
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