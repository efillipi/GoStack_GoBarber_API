import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(request: Request, response: Response, next: NextFunction): void {

  const authHeader = request.headers.authorization;


  if (!authHeader) {
    throw new AppError('Falha na Autenticação, JTW token is missing', 401)
  }

  const [, token] = authHeader.split(" ")

  try {

    const decode = verify(token, process.env.JWT_KEY)

    const { sub } = decode as TokenPayload

    request.user = {
      id: sub
    }

    return next()

  } catch (error) {

    throw new AppError('Falha na Autenticação, Invalid JTW token', 401)

  }

}