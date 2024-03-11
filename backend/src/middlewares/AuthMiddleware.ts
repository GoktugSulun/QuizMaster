import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
   namespace Express {
      interface Request {
         user?: any;
      }
   }
}

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
   const authHeader: string | undefined = req.headers.authorization;
   const token: string | undefined = authHeader?.split?.(' ')?.[1];
   
   if (!token) {
      return res.status(401).json({ type: false, message: 'Authentication failed' });
   }
   
   jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, decoded: any) => {
      if (err) {
         return res.status(401).json({ type: false, message: 'Invalid token' });
      }
      
      req.user = decoded;
      next();
   });
};

export default AuthMiddleware;
