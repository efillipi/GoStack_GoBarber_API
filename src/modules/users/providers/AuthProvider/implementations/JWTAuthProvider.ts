import IAuthProvider from '@modules/users/providers/AuthProvider/models/IAuthProvider'
import authConfig from '@config/auth'
import { sign } from 'jsonwebtoken'
import User from '@modules/users/infra/typeorm/entities/User';

class JWTAuthProvider implements IAuthProvider {

  public async sing(user: User): Promise<string> {

    const { secret, expiresIn } = authConfig.jtw

    const token = sign(
      {},
      secret,
      {
        subject: user.id,
        expiresIn,
      }
    );



    return token
  }

  public async verify(payload: string): Promise<boolean> {



    return
  }


}
export default JWTAuthProvider
