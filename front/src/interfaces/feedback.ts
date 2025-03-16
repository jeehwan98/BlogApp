import { User } from "./user";

export interface Feedback {
  id: number;
  user: User;
  content: string;
  createdAt: Date;
}