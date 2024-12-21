import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '@/constants';

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.query.userId = (decoded as jwt.JwtPayload).id;
      next();
    } catch (error) {
      res.status(403).json({message: 'Forbidden', error});
    }
  } else {
    res.status(403).json({message: 'Forbidden! No token'});
  }
};
