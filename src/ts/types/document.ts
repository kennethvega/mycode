export type Document = {
  content: string;
  createdAt: number;
  updatedAt: number;
  id: string;
  photoURL: string | null;
  slug: string;
  tags: string[];
  title: string;
  username: string;
};
