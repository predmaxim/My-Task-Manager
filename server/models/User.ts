import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserType } from '../utils/types';
import { ProjectSchema } from './Project';

export const UserSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    minLength: [1, 'Your name must be longer than 1 characters'],
    maxLength: [100, 'Your name must be shorten than 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    minLength: [1, 'Your email must be longer than 1 characters'],
    maxLength: [100, 'Your email must be shorten than 100 characters'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [1, 'Your password must be longer than 1 characters'],
    maxLength: [100, 'Your password must be shorten than 100 characters'],
    select: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  lastVisit: Date,
  avatarURL: String,
  projects: [ProjectSchema],
}
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.User || mongoose.model<UserType>('User', UserSchema);