export interface Post {
  id: string;
  title: string;
  text: string;
  claps: number;
  createdAt: string;
  postId?: string;
  user: {
    fullName: string;
  };
  comments?: Post[];
}

export enum Role {
  User = 0,
  ADMIN = 1,
}
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}
