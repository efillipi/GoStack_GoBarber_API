import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import JWTAuthProvider from '@modules/users/providers/AuthProvider/implementations/JWTAuthProvider';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  const jtwAuthProvider = new JWTAuthProvider();

  if (!authHeader) {
    throw new AppError('Falha na Autenticação, JTW token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = await jtwAuthProvider.verify(token);

    const { sub } = decode as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Falha na Autenticação, Invalid JTW token', 401);
  }
}
