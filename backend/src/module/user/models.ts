import mongoose, {Schema, Model} from 'mongoose';
import {UserDocument} from './type';

const userSchema = new Schema({
  id: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  image: {
    type: Schema.Types.String,
    default: null,
  },
  city: {
    type: Schema.Types.String,
    required: true,
  },
  bio: {
    type: Schema.Types.String,
    default: null,
  },
  profile_url: {
    type: Schema.Types.String,
    default: null,
  },
  is_deleted: {
    type: Schema.Types.Boolean,
    default: false,
  },
  following: {
    type: [String],
    default: [],
  },
  followers: {
    type: [String],
    default: [],
  },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
});

const User: Model<UserDocument> = mongoose.model<UserDocument>(
  'user',
  userSchema
);

export {User};
