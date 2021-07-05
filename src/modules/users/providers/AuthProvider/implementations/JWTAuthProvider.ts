import IAuthProvider from '@modules/users/providers/AuthProvider/models/IAuthProvider';
import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import { sign, verify } from 'jsonwebtoken';

const { secret, expiresIn } = authConfig.jtw;

class JWTAuthProvider implements IAuthProvider {
  public async sing(user: User): Promise<string> {
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return token;
  }

  public async verify(token: string) {
    const decode = verify(token, secret);

    return decode;
  }
}
export default JWTAuthProvider;
