export type ThisParams = {
  flag: string | undefined;
};

export type UserRoutesErrors = {
  INVALID_DATA: string;
  NO_AUTHORIZED: string;
  NO_AUTHORIZED_INVALID_TOKEN: string;
  INVALID_TOKEN_DOMAIN: string;
  INVALID_TOKEN: string;
  USER_NOT_EXISTS: string;
  USER_ALREADY_EXISTS: string;
  INCORRECT_PASSWORD: string;
  INVALID_AUTHORIZATION: string;
  INVALID_EMAIL: string;
  DEFAULT: string;
  DEFAULT_DELETE: string;
};

export default (params: ThisParams): UserRoutesErrors => {
  const { flag } = params;
  return {
    INVALID_DATA: `cannot-perform-operation-due-invalid-parameters -> ${flag}`,
    NO_AUTHORIZED: `user-not-authorized-for-this-action -> ${flag}`,
    NO_AUTHORIZED_INVALID_TOKEN: `not-authorized-due-to-invalid-token -> ${flag}`,
    INVALID_TOKEN_DOMAIN: `not-authorized-due-to-invalid-token-domain -> ${flag}`,
    INVALID_TOKEN: `not-authorized-due-to-needs-a-token-to-authenticate -> ${flag}`,
    USER_NOT_EXISTS: `user-with-email-(${flag})-cannot-be-found`,
    USER_ALREADY_EXISTS: `user-with-email-(${flag})-already-exist`,
    INCORRECT_PASSWORD: `error-trying-to-login-(${flag})-due-invalid-password`,
    INVALID_AUTHORIZATION: `error-trying-to-login-(${flag})-invalid-request-token-authorization`,
    INVALID_EMAIL: `error-in-user-processes-(${flag})-invalid-email`,
    DEFAULT: `error-trying-to-register-new-user-(${flag})`,
    DEFAULT_DELETE: `error-trying-to-register-new-user`,
  };
};
