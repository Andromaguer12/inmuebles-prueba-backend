import express from 'express';
const app = express();

const isDev: boolean = app.get('env') === 'development' ? true : false;

export interface NodeMailerConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface MongoConfigVars {
  jwtSecret: string;
  MONGODB: {
    URI: string;
    USER: string;
    PASSWORD: string;
    CURRENT_VALIDATED_DOMAIN: string;
  };
  nodemailerConfig: NodeMailerConfig;
}

const configs = (): MongoConfigVars => ({
  jwtSecret: process.env.JWT_SECRET || 'token',
  MONGODB: {
    URI: isDev ? (process.env.MONGO_DB_LOCAL as string) : (process.env.MONGO_DB_PROD as string),
    USER: process.env.MONGO_USER || '',
    PASSWORD: process.env.MONGO_PASSWORD || '',
    CURRENT_VALIDATED_DOMAIN: isDev
      ? (process.env.LOCAL_REQUEST_VALIDATOR as string)
      : (process.env.PROD_REQUEST_VALIDATOR as string),
  },
  nodemailerConfig: {
    host: process.env.NODE_MAILER_HOST,
    port: Number(process.env.NODE_MAILER_PORT),
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_AUTH_USER,
      pass: process.env.NODE_MAILER_AUTH_PASS,
    },
  },
});

export default configs;
