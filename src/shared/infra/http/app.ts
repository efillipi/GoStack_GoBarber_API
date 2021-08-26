/* eslint-disable no-console */
import 'reflect-metadata';
import '@shared/infra/typeorm';
import '@shared/Container';
import 'express-async-errors';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import routes from '@shared/infra/http/routes/index';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import cors from 'cors';
import rateLimiter from './middlewares/rateLimiter';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(routes);

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use('/tmp', express.static(uploadConfig.tmpFolder));
app.use(errors());

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'Error',
        message: err.message,
      });
    }

    console.error('err : ', err);

    return response.status(500).json({
      status: 'Error',
      message: `Interna Server Error ${err.message}`,
    });
  },
);

export default app;
