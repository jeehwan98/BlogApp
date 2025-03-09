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