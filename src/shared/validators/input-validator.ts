'use strict';

import mongoose from 'mongoose';

const verifyEmail = (value: string) => {
  const emailRex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return true;
  }
  return false;
};

const mongoIdValidator = (_id: string) => {
  return mongoose.Types.ObjectId.isValid(_id);
};

export default {
  mongoIdValidator,
  verifyEmail,
};
