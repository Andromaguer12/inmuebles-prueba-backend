/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from 'crypto-js';
import bcrypt from 'bcrypt';
import { EncryptationMethods } from '../../typesDefs/utils/encryptation/enums';
import { HashingOptions } from '../../typesDefs/utils/encryptation/types';
import ErrorCodes, { EncryptationErrors } from './errors';
import { defaultEncryptedStringFlag } from '../../config/constants/utils/constants';
import jwt from 'jsonwebtoken';
import configs from '../../config/constants/constants-config';
import { UserDocument, UserTokenPayload } from '../../typesDefs/models/users/types';

class Encryptation {
  hashingMethod: any;
  encryptationMethod: any;
  mode: string;
  hashingOpts: HashingOptions | null;
  errorCodes: (flag: string | undefined) => EncryptationErrors;
  generatedSalt: string;

  constructor(mode: EncryptationMethods, hashingOptions: HashingOptions | null) {
    this.hashingMethod = bcrypt;
    this.encryptationMethod = CryptoJS.AES;
    this.mode = mode;
    this.generatedSalt = '';
    this.hashingOpts = hashingOptions;
    this.errorCodes = (flag: string | undefined) => ErrorCodes({ mode: this.mode, flag });
  }

  /**
   * all about hashing methods
   */

  async generateSalt(defaultSaltNumber: any): Promise<string> {
    if (this.mode !== EncryptationMethods.hashingMethod)
      throw new Error(this.errorCodes(undefined).METHOD_NOT_PERMITTED_IN);
    const saltNumber: HashingOptions = {
      saltGenerationNumber: defaultSaltNumber ?? this.hashingOpts?.saltGenerationNumber,
    };
    this.generatedSalt = await this.hashingMethod.genSalt(saltNumber.saltGenerationNumber);
    return this.generatedSalt;
  }

  async compareHash(string: string, hash: string | undefined): Promise<boolean> {
    if (this.mode !== EncryptationMethods.hashingMethod)
      throw new Error(this.errorCodes(undefined).METHOD_NOT_PERMITTED_IN);
    return await this.hashingMethod.compare(string, hash);
  }

  async hashEncryptation(string: string, defaultSalt: string) {
    if (this.mode !== EncryptationMethods.hashingMethod)
      throw new Error(this.errorCodes(undefined).METHOD_NOT_PERMITTED_IN);
    const currentSalt: string = defaultSalt ?? this.generatedSalt;
    return await this.hashingMethod.hash(string, currentSalt);
  }

  /**
   * end of hashing methods
   */

  /**
   * =========================
   */

  /**
   * common encryptation
   */

  async commonEncrypt(string: string, key: string | undefined): Promise<string> {
    let encryptationKey = key;
    if (key === undefined) encryptationKey = process.env.DECRYPT_KEY ?? undefined;
    if (this.mode !== EncryptationMethods.commonEncryptation)
      throw new Error(this.errorCodes(undefined).METHOD_NOT_PERMITTED_IN);
    let newToken = this.encryptationMethod.encrypt(string, encryptationKey);
    if (key === undefined) newToken = newToken + defaultEncryptedStringFlag;
    return newToken.toString();
  }

  async commonDecrypt(string: string, key: string | undefined): Promise<string> {
    let encryptationKey = key;
    let stringToDecrypt = string;
    if (this.mode !== EncryptationMethods.commonEncryptation)
      throw new Error(this.errorCodes(undefined).METHOD_NOT_PERMITTED_IN);
    if (string.includes(defaultEncryptedStringFlag)) {
      stringToDecrypt = string.substring(0, string.indexOf(defaultEncryptedStringFlag));
      encryptationKey = process.env.DECRYPT_KEY ?? undefined;
    }
    let newToken;
    try {
      newToken = CryptoJS.enc.Utf8.stringify(
        this.encryptationMethod.decrypt(stringToDecrypt, encryptationKey),
      ).toString();
    } catch (error: any) {
      newToken = 'null';
      throw new Error(this.errorCodes(error.message as string).ERROR_DECRYPTING_IN);
    }
    return newToken;
  }

  /**
   * end of common encryptation
   */

  /**
   * token generation
   */

  async createAuthToken(userDataToEncrypt: Partial<UserDocument>) {
    const domain = configs().MONGODB.CURRENT_VALIDATED_DOMAIN;

    if (this.mode !== EncryptationMethods.JWT) throw new Error(this.errorCodes(undefined).METHOD_NOT_PERMITTED_IN);

    const tokenPayload: UserTokenPayload = { ...userDataToEncrypt, tokenDomain: domain as string };

    return jwt.sign(tokenPayload, configs().jwtSecret, { expiresIn: 86400000 });
  }

  async validateToken(token: string): Promise<Partial<UserTokenPayload> | 'expired' | null> {
    if (this.mode !== EncryptationMethods.JWT) throw new Error(this.errorCodes(undefined).METHOD_NOT_PERMITTED_IN);
    try {
      const data = jwt.verify(token, configs().jwtSecret);
      return data as Partial<UserTokenPayload>;
    } catch (err: any) {
      return err.message === 'jwt expired' ? 'expired' : null;
    }
  }

  /**
   * end of token generation
   */
}

export default Encryptation;
