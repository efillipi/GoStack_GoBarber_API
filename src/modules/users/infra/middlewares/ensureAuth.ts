import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import JWTAuthProvider from '@modules/users/providers/AuthProvider/implementations/JWTAuthProvider';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuth(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  const jtwAuthProvider = new JWTAuthProvider();

  if (!authHeader) {
    throw new AppError('Falha na Autenticação, JTW token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = await jtwAuthProvider.verify(token);

    const { sub } = decode as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Falha na Autenticação, Invalid JTW token', 401);
  }
}
