export type ThisParams = {
  mode: string | undefined;
  flag: string | undefined;
};

export type EncryptationErrors = {
  METHOD_NOT_PERMITTED_IN: string;
  ERROR_DECRYPTING_IN: string;
};

export default (params: ThisParams): EncryptationErrors => {
  const { mode, flag } = params;
  return {
    METHOD_NOT_PERMITTED_IN: `error-method-no-permitted-in-${mode}`,
    ERROR_DECRYPTING_IN: `error-decrypting-in-mode-(${mode})-returned-error-(${flag})`,
  };
};
