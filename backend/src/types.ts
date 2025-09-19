export type Pitch = {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  votes: number;
  commentCount: number;
  author: { uid: string; name?: string; photoURL?: string };
  createdAt: string;
  updatedAt: string;
};
export type Comment = {
  _id: string;
  pitchId: string;
  body: string;
  author: { uid: string; name?: string; photoURL?: string };
  createdAt: string;
};
