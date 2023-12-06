'use strict';

import { Request, Response } from 'express';
import { UserDocument } from '../../typesDefs/models/users/types';
import asyncHandler from 'express-async-handler';
import inputValidator from '../../shared/validators/input-validator';
import userRepository from '../../shared/repositories/usersRepository';
import { UserLevelsPermissions } from '../../typesDefs/models/users/enum';
import currentErrorInterface from '../../controllers/errors/users/errors';

const errorInterface = (flag: string) => currentErrorInterface({ flag });

// @desc    Create user
// @route   POST /api/users
// @access  Private/Admin
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    email,
    description,
    image,
    permissions = UserLevelsPermissions.Common,
    password,
    phone,
  }: UserDocument = req.body;

  const isValidEmail = inputValidator.verifyEmail(email);

  if (!isValidEmail) {
    res.status(400);
    throw new Error(errorInterface(email).INVALID_EMAIL);
  }

  const emailExists: any = await userRepository.getUserByEmail(email);

  if (emailExists && !emailExists.error) {
    res.status(400);
    throw new Error(errorInterface(email).USER_ALREADY_EXISTS);
  }

  const user: any = await userRepository.createUser(name, email, description, image, permissions, password, phone);

  if (user.error) {
    res.status(400);
    throw new Error(errorInterface(user.message).DEFAULT);
  }

  delete user.password;

  res.status(201).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      permissions: user.permissions,
    },
  });
});

export default registerUser;
