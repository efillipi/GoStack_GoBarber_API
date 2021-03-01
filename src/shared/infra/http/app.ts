import "reflect-metadata";
import '@shared/infra/typeorm'
import '@shared/Container/index'
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'
import routes from '@shared/infra/http/routes/index'
import AppError from '@shared/errors/AppError'
import uploadConfig from '@config/upload'
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

        console.error('err : ', err);

        return response.status(500).json({
            status: "Error",
            message: `Interna Server Error ${err.message}`
        })

    }
)

export default app;