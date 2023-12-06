import express from 'express';
import cors from 'cors';
// import { AllEndPoints } from './routes/endpoints.index';
import morgan from 'morgan';
import dotenv from 'dotenv';
import configs from '../constants/constants-config';
import initConnection from '../mongoose/mongoDatabase';
import passport from 'passport';
import appRoutes from '../../routes';
import { errorHandler, notFound } from '../../middlewares/errorMiddlewares';
import userPassportAuthorization from '../../middlewares/passportMiddleware';
import path from 'path';

const app = express();

// applying middlewares
dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    // origin: function (origin, callback) {
    //   const allowedOrigins = [process.env.NODE_PROD_DOMAIN, 'http://localhost:3000'];
    //   if (process.env.NODE_ENV === 'development' || allowedOrigins.indexOf(origin) !== -1) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.NODE_PROD_DOMAIN,
    methods: ['GET', 'POST'],
  }),
);
app.use(express.json());
app.use(passport.initialize());

// app routes
app.use('/api', appRoutes);

//config statics
const __dirnames = path.resolve();
app.use('/public', express.static(path.join(__dirnames, 'public')));
app.use(notFound);
app.use(errorHandler);

//applying middleware to passport
passport.use(userPassportAuthorization);

// routes

// connection to mongodb data base
const URI = configs().MONGODB.URI;
initConnection(URI);

export default app;
