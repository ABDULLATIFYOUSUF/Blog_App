import multer from "multer";
import DatauriParser from "datauri/parser.js";
import path from "path";

const storage = multer.memoryStorage(); // Store file in memory buffer
const upload = multer({ storage });

const parser = new DatauriParser();

const formatBufferToDataURI = (file) => {
  return parser.format(path.extname(file.originalname).toString(), file.buffer);
};

export { upload, formatBufferToDataURI };
