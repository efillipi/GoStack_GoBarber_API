import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth'

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(request: Request, response: Response, next: NextFunction): void {

  const {secret} = authConfig.jtw

  const authHeader = request.headers.authorization;


  if (!authHeader) {
    throw new AppError('Falha na Autenticação, JTW token is missing', 401)
  }

  const [, token] = authHeader.split(" ")

  try {

    const decode = verify(token, secret)

    const { sub } = decode as TokenPayload

    request.user = {
      id: sub
    }

    return next()

  } catch (error) {

    throw new AppError('Falha na Autenticação, Invalid JTW token', 401)

  }

}