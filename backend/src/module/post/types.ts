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
  disliked_by: [];
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
  like_count: number;
  liked_by: UserDocument[];
  disliked_by: UserDocument[];
  is_deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
