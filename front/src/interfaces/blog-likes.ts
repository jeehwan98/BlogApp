import { Blog } from "./blog";
import { User } from "./user";

export interface BlogLikes {
  id: number;
  blog: Blog;
  user: User;
}