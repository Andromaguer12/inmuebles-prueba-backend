/* eslint-disable @typescript-eslint/no-explicit-any */
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import configs from '../config/constants/constants-config';
import userRepository from '../shared/repositories/usersRepository';
import currentErrorInterface from '../controllers/errors/users/errors';
import { UserTokenPayload } from '../typesDefs/models/users/types';

const handleErrors = (flag: string) => currentErrorInterface({ flag });

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: configs().jwtSecret,
};

export default new Strategy(options, async (payload: UserTokenPayload, done: (validated: boolean) => void) => {
  try {
    const exists = await userRepository.getUserByEmail(payload?.email);
    if (exists) {
      return done(true);
    } else {
      done(false);
      throw new Error(handleErrors('user-with-email-' + payload.email).INVALID_AUTHORIZATION);
    }
  } catch (error) {
    throw new Error(error as string);
  }
});
