import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'

import './database'
import routes from '../src/routes/index'
import AppError from "./errors/AppError";

const app = express();
app.use(express.json())
app.use(routes);


app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {

        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message
            })
        }

        return response.status(500).json({
            status: "Error",
            message: `Interna Server Error ${err.message}`
        })

    }
)

export default app;