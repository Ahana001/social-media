import {UserDocument} from '../user/type';

export type PostDocument = {
  _id?: string;
  id: string;
  content: string;
  picture_url?: string;
  picture_public_id?: string;
  author_id: string;
  like_count: number;
  liked_by: [];
  bookmark_by: [];
  is_deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
export type PostDetails = {
  _id?: string;
  id: string;
  content: string;
  picture_url?: string;
  picture_public_id?: string;
  author_id: string;
  user?: {};
  like_count: number;
  liked_by: UserDocument[];
  bookmark_by: UserDocument[];
  is_deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
