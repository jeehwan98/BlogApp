import { BlogLikes } from "./blog-likes";
import { User } from "./user";

export interface PostBlog {
  title: string;
  tags: string[];
  content: string;
}

export interface Tags {
  name: string[];
}

export interface Blog {
  id: number;
  title: string;
  tags: string[];
  content: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  likesCount: BlogLikes;
  liked: boolean;
}

export interface HandleLikeProps {
  id: number;
  initialLikes: number;
  initialLiked: boolean;
  onLikeChange?: (id: number, liked: boolean) => void; // Optional callback
}

export interface Comment {
  id: number;
  content: string;
  userName: string;
  userEmail: string;
  userImage: string;
  blog: Blog;
  createdAt: Date;
  updatedAt: Date;
}