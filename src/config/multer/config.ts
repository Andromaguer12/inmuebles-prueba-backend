import multer from 'multer';
import FIELDS_NAMES from './fieldsNames';
import { TYPES_IMAGES, TYPES_VIDEOS } from './filesTypes';
import path from 'path';
import normalizeFileName from '../../shared/helpers/normalize-name';

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      req.baseUrl === '/api/buildings' &&
      FIELDS_NAMES.includes(file.fieldname) &&
      TYPES_IMAGES.includes(file.mimetype)
    ) {
      const folder = path.join(__dirname, '../', '../', '../', 'public', 'assets', 'images', 'buildings');
      cb(null, folder);
      return;
    }
    if (
      req.baseUrl === '/api/buildings' &&
      FIELDS_NAMES.includes(file.fieldname) &&
      TYPES_VIDEOS.includes(file.mimetype)
    ) {
      const folder = path.join(__dirname, '../', '../', '../', 'public', 'assets', 'videos', 'buildings');
      cb(null, folder);
      return;
    }
    if (req.baseUrl === '/api/users' && FIELDS_NAMES.includes(file.fieldname) && TYPES_IMAGES.includes(file.mimetype)) {
      const folder = path.join(__dirname, '../', '../', '../', 'public', 'assets', 'images', 'user-images');
      cb(null, folder);
      return;
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = new Date().getTime();
    const fileName = uniqueSuffix + '-' + normalizeFileName(file.originalname);
    cb(null, fileName);
  },
});

const uploadToLocalStorage = multer({ storage: localStorage });

export default uploadToLocalStorage;
