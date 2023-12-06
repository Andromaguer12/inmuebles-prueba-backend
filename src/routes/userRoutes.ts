'use strict';

import express from 'express';
import registerUser from '../controllers/users/register-user-controller';
import authUser from '../controllers/users/auth-user-controller';
import deleteUser from '../controllers/users/delete-user-controller';
import { forEditor, protect } from '../middlewares/authMiddleware';
import updateUserImage from '../controllers/users/update-user-image-controller';
import uploadToLocalStorage from '../config/multer/config';
import { USER_PROFILE_IMAGE } from '../config/multer/fieldsNames';

const router = express.Router();

router.route('/login').post(authUser);
// router.route('/').post(protect, forEditor, registerUser);
router.route('/').post(registerUser);
router.route('/delete').delete(protect, forEditor, deleteUser);
router
  .route('/update-image')
  .post(protect, uploadToLocalStorage.fields([{ name: USER_PROFILE_IMAGE, maxCount: 1 }]), updateUserImage);

export default router;
