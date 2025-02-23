


import React from "react";

export interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface RegisterDetails {
  image: string;
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
  introduction: string;
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