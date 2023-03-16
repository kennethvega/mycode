export type Document = {
  content: string;
  createdAt: number;
  updatedAt: number;
  id: string;
  photoURL: string | null;
  slug: string;
  tags: string[];
  likes: string[];
  title: string;
  username: string;
  comments: number | null;
};
