export type UserDocument = {
  _id?: string;
  id: string;
  username: string;
  password?: string;
  image?: string;
  city: string;
  bio?: string;
  profile_url?: string;
  is_deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  bookmarks: string[];
  followers: string[];
  following: [];
};

export type UserDetails = {
  _id?: string;
  id: string;
  username: string;
  password?: string;
  image?: string;
  city: string;
  bio?: string;
  profile_url?: string;
  is_deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  bookmarks: string[];
  followers: UserDocument[];
  following: UserDocument[];
};
