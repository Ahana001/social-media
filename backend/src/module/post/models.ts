import mongoose, {Schema, Model} from 'mongoose';
import {PostDocument} from './types';

const postSchema = new Schema({
  id: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  content: {
    type: Schema.Types.String,
    required: true,
  },
  picture_url: {
    type: Schema.Types.String,
    default: null,
  },
  picture_public_id: {
    type: Schema.Types.String,
    default: null,
  },
  author_id: {
    type: Schema.Types.String,
    required: true,
  },
  like_count: {
    type: Schema.Types.Number,
    default: 0,
  },
  liked_by: {
    type: [String],
    default: [],
  },
  bookmark_by: {
    type: [String],
    default: [],
  },
  is_deleted: {type: Schema.Types.Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
});

const Post: Model<PostDocument> = mongoose.model<PostDocument>(
  'post',
  postSchema
);

export {Post};
