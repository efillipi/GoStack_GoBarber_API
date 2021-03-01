import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'
import './database'
import routes from '../src/routes/index'
import AppError from "./errors/AppError";
import uploadConfig from '../src/config/upload'
const app = express();
app.use(express.json())
app.use(routes);

app.use('/files', express.static(uploadConfig.directory))


app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {

        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: "Error",
                message: err.message
            })
        }

        console.error('err : ',err);

        return response.status(500).json({
            status: "Error",
            message: `Interna Server Error ${err.message}`
        })

    }
)

export default app;