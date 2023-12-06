'use strict';

import asyncHandler from 'express-async-handler';
import inputValidator from '../../shared/validators/input-validator';
import userRepository from '../../shared/repositories/usersRepository';
import Encryptation from '../../utils/encryptation/encryptation';
import { UserDocument } from '../../typesDefs/models/users/types';
import { EncryptationMethods } from '../../typesDefs/utils/encryptation/enums';
import currentErrorInterface from '../../controllers/errors/users/errors';
import { Request, Response } from 'express';

const errorInterface = (flag: string) => currentErrorInterface({ flag });

interface CurrentRequest extends Request {
  body: { email: string; password: string };
}

// @desc    Auth user && get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req: CurrentRequest, res: Response) => {
  const { email, password } = req.body;

  const tokenEncryptation = new Encryptation(EncryptationMethods.JWT, { saltGenerationNumber: 10 });

  const isValidEmail = inputValidator.verifyEmail(email);

  if (!isValidEmail) {
    res.status(400);
    throw new Error(errorInterface(email).INVALID_EMAIL);
  }

  const user = await userRepository.findUserByEmail(email, password);

  if (!user) {
    res.status(400);
    throw new Error(errorInterface(email).INCORRECT_PASSWORD);
  }

  // TODO: CREATE MEDIATOKENS FOR PROTECTED IMAGES

  // const mediaToken = generateMediaToken()

  const userInfo: Partial<UserDocument> = {
    _id: user._id,
    name: user?.name,
    email: user?.email,
    description: user?.description,
    image: user?.image,
    permissions: user?.permissions,
    password: user?.password,
    phone: user?.phone,
  };

  const token = await tokenEncryptation.createAuthToken(userInfo);

  res.status(200).json({
    token,
  });
});

export default authUser;
