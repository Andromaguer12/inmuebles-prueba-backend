/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '../../config/mongoose/models/userModel';
import { UserLevelsPermissions } from '../../typesDefs/models/users/enum';
import { UserDocument } from '../../typesDefs/models/users/types';

/**
 * saves an user instance
 * @param {Object} user
 * @returns user
 */
async function saveUser(user: any) {
  return user.save();
}

/**
 * used for get a single user by id
 * @param {String} id
 * @returns a single user or an error
 */
async function getUserById(
  id: string | undefined,
): Promise<Partial<UserDocument> | { error: boolean; message: string }> {
  const user = await User.findOne({ _id: id });

  if (!user) return { error: true, message: 'Error: error getting the user' };

  return user as unknown as Promise<Partial<UserDocument>>;
}

/**
 * used for get a single user by email
 * @param {String} id
 * @returns a single user or an error
 */
async function getUserByEmail(
  email: string | undefined,
): Promise<Partial<UserDocument> | { error: boolean; message: string }> {
  const user = await User.findOne({ email });

  if (!user) return { error: true, message: 'Error: error getting the user' };

  return user;
}

/**
 * used for get a single user by email and authenticates with password
 * @param {String} id
 * @returns a single user or an error
 */
async function findUserByEmail(email: string, password: string) {
  const user: any = await User.findOne({ email });

  if (!user) return { error: true, message: 'Error: error getting the user' };

  if (user && (await user.matchPassword(password))) {
    delete user.password;
    return user;
  }

  return null;
}

/**
 * This function create a user note
 * @param {String} owner
 * @param {String} body
 * @returns
 */
async function createUser(
  name: string | undefined,
  email: string | undefined,
  description: string | undefined,
  image: string | undefined,
  permissions: UserLevelsPermissions | undefined,
  password: string | undefined,
  phone: string | undefined,
): Promise<Partial<UserDocument> | { error: boolean; message: string }> {
  const currentData: Partial<UserDocument> = {
    name,
    email,
    description,
    image,
    permissions,
    password,
    phone,
  };

  const userCreated = new User(currentData);

  const validationError = userCreated.validateSync();
  if (validationError) {
    return { error: true, message: validationError.message };
  }

  const saved = await saveUser(userCreated);

  return saved;
}

/**
 * function to update a single user
 * @param {Object} body
 * @param {String} id
 * @returns updated data
 */
async function updateUser(body: Partial<UserDocument>, id: string) {
  try {
    return User.updateOne({ _id: id }, body);
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

/**
 * function to delete a single user
 * @param {String} id
 * @returns object
 */
async function deleteUser(id: string) {
  try {
    return User.deleteOne({ _id: id });
  } catch (error: any) {
    return { error: true, message: error?.message };
  }
}

async function findUserExist(id: string) {
  const exists = await User.exists({ _id: id });

  if (!exists) return { error: true, message: 'Error: error getting the user' };

  return;
}

export default {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  findUserExist,
  findUserByEmail,
  getUserByEmail,
};
