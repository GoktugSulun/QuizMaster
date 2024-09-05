import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

const GenerateUuid = (req: Request, res: Response, next: NextFunction) => {
  req.uuid = uuidv4();
  next();
};

export default GenerateUuid;