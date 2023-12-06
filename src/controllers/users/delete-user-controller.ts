'use strict';

import asyncHandler from 'express-async-handler';
import inputValidator from '../../shared/validators/input-validator';
import userRepository from '../../shared/repositories/usersRepository';
import currentErrorInterface from '../../controllers/errors/users/errors';
import { Request, Response } from 'express';
import { UserDocument } from '../../typesDefs/models/users/types';

const errorInterface = (flag: string) => currentErrorInterface({ flag });

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/Super
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  if (!inputValidator.mongoIdValidator(req.params.id)) {
    res.status(400);
    throw new Error(errorInterface(req.params.id).INVALID_DATA);
  }

  const user: any = await userRepository.getUserById(req.params.id);

  if (user?.error) {
    res.status(404);
    throw new Error(errorInterface(user.message).USER_NOT_EXISTS);
  }

  const userDeleted = await userRepository.deleteUser(user?._id);

  if (!userDeleted) {
    res.status(400);
    throw new Error(errorInterface('').DEFAULT_DELETE);
  }

  res.status(200).json(req.params.id);
});

export default deleteUser;
