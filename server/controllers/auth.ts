import {Request, RequestHandler, Response} from 'express';
import {compareSync, genSaltSync, hashSync} from 'bcrypt-ts';
import jwt from 'jsonwebtoken';
import {prisma} from '@/lib/prisma-client';
import {z} from 'zod';
import {JWT_EXPIRES, JWT_SECRET} from '@/constants';

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {email, password} = z.object({
      email: z.string().email(),
      password: z.string()
    }).parse(req.body);

    const isUsed = await prisma.user.findFirst({where: {email}});

    if (isUsed) {
      res.status(400).json({message: 'This email is busy', ok: false});
      return;
    }

    const hash = hashSync(password, genSaltSync(10));

    const newUser = await prisma.user.create({
      data: {
        password: hash,
        email,
        roleId: 2
      }
    });

    const token = jwt.sign(
      {id: newUser.id},
      JWT_SECRET,
      {expiresIn: JWT_EXPIRES}
    );

    res.status(201).json({newUser, token, message: 'Registration completed successfully', ok: true});
  } catch (error) {
    res.status(500).json({message: 'An error when creating a user', error, ok: false});
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {email, password} = z.object({
      email: z.string().email(),
      password: z.string()
    }).parse(req.body);

    const user = await prisma.user.findFirst({where: {email}});

    if (!user) {
      res.status(404).json({message: 'User not found', ok: false});
      return;
    }

    // TODO: check, may be password need to be hashed before compare
    const isPasswordCorrect = compareSync(password, user.password);

    if (!isPasswordCorrect) {
      res.status(403).json({message: 'Incorrect password'});
      return;
    }

    const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES});
    res.status(200).json({token, user, message: 'Auth success!', ok: true});
  } catch (error) {
    res.status(403).json({message: 'Auth error!', error, ok: false});
  }
};

export const getMe: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId = z.object({userId: z.number()}).parse(req.query).userId;
    const user = await prisma.user.findUnique({where: {id: userId}});

    if (!user) {
      res.status(404).json({message: 'User not found!', ok: false});
      return;
    }

    const token = jwt.sign({id: user?.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES});
    res.status(200).json({user, token, ok: true});
  } catch (error) {
    res.status(403).json({message: 'Forbidden!', error, ok: false});
  }
};
