/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import { Request, Response } from 'express';
import { UserDocument } from '../../typesDefs/models/users/types';
import asyncHandler from 'express-async-handler';
import userRepository from '../../shared/repositories/usersRepository';
import currentErrorInterface from '../../controllers/errors/users/errors';
import { USER_PROFILE_IMAGE } from '../../config/multer/fieldsNames';
import fs from 'fs';
import path from 'path';
import inputValidator from '../../shared/validators/input-validator';

const errorInterface = (flag: string) => currentErrorInterface({ flag });

interface CustomRequest extends Request {
  files: {
    userProfileImage: any[];
  };
  user: UserDocument;
}

// @desc    update user image
// @route   POST /api/users/update-image
// @access  Private/Admin
const updateUserImage = asyncHandler(async (req: CustomRequest, res: Response) => {
  const newUserImage = req.files[USER_PROFILE_IMAGE];
  const images = newUserImage.map((file) => ({
    link: file.filename,
    name: file.originalname,
  }));
  const { _id } = req.user;

  const fileDeleter = (array: any) => {
    array.forEach((file) => {
      const pathToFiles = path.join(
        __dirname,
        '../',
        '../',
        '../',
        'public',
        'assets',
        'images',
        'user-images',
        file.link,
      );
      if (fs.existsSync(pathToFiles)) {
        fs.unlinkSync(pathToFiles);
      }
    });
  };

  const isValidId = inputValidator.mongoIdValidator(_id);

  if (!isValidId) {
    res.status(400);
    fileDeleter(images);
    throw new Error(errorInterface('Not valid id').DEFAULT);
  }

  const updateUser: any = await userRepository.updateUser({ image: images[0].link }, _id);

  if (updateUser.error) {
    res.status(400);
    fileDeleter(images);
    throw new Error(errorInterface(updateUser.message).DEFAULT);
  }

  const user: any = await userRepository.getUserById(_id);

  if (user.error) {
    res.status(400);
    fileDeleter(images);
    throw new Error(errorInterface(user.message).DEFAULT);
  }

  delete user.password;

  res.status(201).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      permissions: user.permissions,
      image: user.image,
    },
  });
});

export default updateUserImage;
