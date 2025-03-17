export interface User {
  id: number,
  email: string,
  name: string,
  image: string,
  introduction: string,
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