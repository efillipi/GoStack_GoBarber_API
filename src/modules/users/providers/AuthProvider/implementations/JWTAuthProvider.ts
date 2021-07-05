import IAuthProvider from '@modules/users/providers/AuthProvider/models/IAuthProvider';
import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import { sign, verify } from 'jsonwebtoken';

class JWTAuthProvider implements IAuthProvider {
  public async sing(user: User): Promise<string> {
    const { secret, expiresIn } = authConfig.jtw;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return token;
  }

  public async verify(token: string): Promise<string | object> {
    const { secret } = authConfig.jtw;

    const decode = verify(token, secret);

    return decode;
  }
}
export default JWTAuthProvider;
