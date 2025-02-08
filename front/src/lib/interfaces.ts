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

export interface PostBlog {
  title: string;
  tags: string[];
  content: string;
}

export interface User {
  int: number;
  name: string;
  email: string;
  role?: string;
  image?: string;
}

export interface Tags {
  name: string;
}

export interface Blog {
  id: number;
  title: string;
  tags: Tags;
  content: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}