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
  author: {
    uid: string;
    name: string;
    avatar?: string | null;
  };
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type Comment = {
  _id: string;
  pitchId: string;
  body: string;
  author: {
    uid: string;
    name: string;
    avatar?: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};
