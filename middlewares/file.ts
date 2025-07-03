import multer, { FileFilterCallback, StorageEngine } from "multer";
import { Request } from "express";

// Disk storage with limits and destination
const file = multer({
  limits: {
    fieldSize: 1024 * 512,
    fieldNameSize: 2000,
  },
  dest: "/tmp/uploads/",
});

// Memory storage
const storage: StorageEngine = multer.memoryStorage();

const fileUpload = multer({
  storage,
  limits: {
    fileSize: 100000000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    // Uncomment to restrict file types:
    // if (!file.originalname.match(/\.(png|jpg|pdf)$/)) {
    //   return cb(new Error('Please upload an Image'));
    // }
    cb(null, true);
  },
});

export { fileUpload, file };