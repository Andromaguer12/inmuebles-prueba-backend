import { UserLevelsPermissions } from './enum';

export interface UserDocument {
  _id?: string;
  name: string;
  email: string;
  description: string;
  image: string;
  permissions: UserLevelsPermissions;
  password?: string;
  phone?: string;
  mediaToken?: string | null;
}

export type UserDocumentValidationInterface = {
  name: (gotName) => string;
  email: (gotEmail) => string;
  description: (gotDescription) => string;
  image: (gotImage) => string;
  permissions: (gotPermissions) => UserLevelsPermissions;
  phone?: (gotPhone) => string;
};

export type UserDocumentWithoutPassword = Omit<UserDocument, 'password'>;

export interface UserTokenPayload extends Partial<UserDocument> {
  tokenDomain: string;
}
