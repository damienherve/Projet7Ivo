export interface Post {
  id: string;
  title: string;
  text: string;
  claps: number;
  createdAt: string;
  user: {
    fullName: string;
  };
}
