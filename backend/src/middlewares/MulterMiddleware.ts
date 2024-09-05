import { Request } from 'express'
import multer, { StorageEngine } from 'multer';
import path from 'path';

const __dirname = path.resolve();

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback) => {
    callback(null, path.join(__dirname + '/src/files'));
  },
  filename: async (req: Request, file: Express.Multer.File, callback: FileNameCallback) => {
    if (file === null) {
      return;
    }
    const uuid = req.uuid;
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}_${uuid}_${file.originalname}`;
    req.multer_image = fileName
    callback(null, fileName);
  }
});

const MulterMiddleware = multer({ storage });

export default MulterMiddleware;
