import {Request, RequestHandler, Response} from 'express';
import {compareSync, genSaltSync, hashSync} from 'bcrypt-ts';
import jwt from 'jsonwebtoken';
import {prisma} from '@/lib/prisma-client';

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '15m';

// Register user
export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body as { email: string, password: string };
    const isUsed = await prisma.user.findFirst({where: {email}});

    if (isUsed) {
      res.status(400).json({message: 'This email is already busy'});
    }

    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    const newUser = await prisma.user.create({
      data: {
        password: hash,
        email,
        roleId: 2
      }
    });
    const token = jwt.sign({id: newUser.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES});

    res.status(201).json({newUser, token, message: 'Registration completed successfully'});

  } catch (error) {
    res.status(500).json({message: 'An error when creating a user', error});
  }
};

// Login user
export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;
    const user = await prisma.user.findFirst({where: {email}});

    if (!user) {
      res.status(404).json({message: 'User not found'});
      return;
    }

    const isPasswordCorrect = compareSync(password, user.password);

    if (!isPasswordCorrect) {
      res.status(403).json({message: 'Incorrect password'});
      return;
    }

    const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES});

    res.status(200).json({token, user, message: 'Auth ok'});

  } catch (error) {
    res.status(403).json({message: 'Auth error', error});
  }
};

// Get Me
export const getMe: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = req.query.userId ? Number(req.query.userId) : null;

    if (!id) {
      res.status(400).json({message: 'Bad payload'});
      return;
    }

    const user = await prisma.user.findUnique({where: {id}});

    if (!user) {
      res.status(404).json({message: 'User not found'});
      return;
    }

    const token = jwt.sign({id: user?.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES});

    res.status(200).json({user, token});

  } catch (error) {
    res.status(403).json({message: 'Forbidden', error});
  }
};
