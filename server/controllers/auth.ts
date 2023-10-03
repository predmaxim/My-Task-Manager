import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES = process.env.JWT_EXPIRES as string;

// Register user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.status(400).json({ message: 'This username is already busy' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ username, password: hash });
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    await newUser.save();

    res.status(201).json({ newUser, token, message: 'Registration completed successfully' });

  } catch (error) {
    res.status(500).json({ message: 'An error when creating a user', error });
  }
}

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res.status(200).json({ token, user, message: 'Auth ok' });

  } catch (error) {
    res.status(403).json({ message: 'Auth error', error });
  }
}

// Get Me
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.query.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res.status(200).json({ user, token });

  } catch (error) {
    res.status(403).json({ message: 'Forbidden', error });
  }
}