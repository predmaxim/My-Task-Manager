import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      req.query.userId = (decoded as jwt.JwtPayload).id;

      next();
      
    } catch (error) {
      return res.json({ message: 'Forbidden' });
    }
  } else {
    return res.json({ message: 'Forbidden' });
  }
}