export type UserSafe = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

export type Pitch = {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  votes: number;
  commentCount: number;
  author: { uid: string; name: string; photoURL?: string };
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  _id: string;
  author: { uid: string; name: string; photoURL?: string };
  body: string;
  createdAt: string;
};


export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};
