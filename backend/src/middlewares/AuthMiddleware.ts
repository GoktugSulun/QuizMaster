import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthenticatedUser from '../utils/AuthenticatedUser';

declare global {
   namespace Express {
      interface Request {
         user?: {
            id: string;
            email: string;
            password: string;
         };
      }
   }
}


const AuthMiddleware = (publicRoute?: boolean) => (req: Request, res: Response, next: NextFunction) => {
   const authHeader: string | undefined = req.headers.authorization;
   const token: string = authHeader?.split?.(' ')?.[1] || "";

   if (publicRoute && !token) {
      AuthenticatedUser.clear();
      req.user = { id: "", email: "", password: "" };
      next();
      return;
   }

   if (!token) {
      AuthenticatedUser.clear();
      return res.status(401).json({ type: false, message: 'Authentication failed' });
   }
   
   jwt.verify(token, process.env.TOKEN_SECRET || "token_secret", (err: any, decoded: any) => {
      if (err) {
         return res.status(401).json({ type: false, message: 'Invalid token' });
      }
      console.log(decoded, " decoded");
      console.log(token, " token");
      
      AuthenticatedUser.setUserId(decoded?.id || "");
      req.user = decoded;
      next();
   });
};

export default AuthMiddleware;
