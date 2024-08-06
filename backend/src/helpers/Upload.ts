import { Request } from 'express'
import multer, { StorageEngine } from 'multer';
import path from 'path';
import { authorizedUserId } from '../index.ts';

const __dirname = path.resolve();

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback) => {
    callback(null, path.join(__dirname + '/src/files'));
  },
  filename: async (req: Request, file: Express.Multer.File, callback: FileNameCallback) => {
    const userId = req.user.id || authorizedUserId; // Todo: authorizedId dynamic olmalı
    const timestamp = new Date().getTime();
    callback(null, `${timestamp}_${userId}_${file.originalname}`);
  }
});

const files = multer({ storage });

export default files;
