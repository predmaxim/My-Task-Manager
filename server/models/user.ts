import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserType } from 'src/utils/types';

const UserSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [6, 'Your password must be longer than 6 characters'],
    select: false,
  },
  avatarURL: String,
  role: {
    type: String,
    default: 'user',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  lastVisit: Date,
  projectsID: [Number]
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.User || mongoose.model<UserType>('User', UserSchema);