/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck: here are no errors
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserDocument } from '../../../typesDefs/models/users/types';
import { UserLevelsPermissions } from '../../../typesDefs/models/users/enum';

// creating schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    permissions: {
      type: String,
      required: true,
      enum: UserLevelsPermissions,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = (await bcrypt.hash(this.password, salt)).toString();
});

export default model<Partial<UserDocument>>('User', userSchema);
