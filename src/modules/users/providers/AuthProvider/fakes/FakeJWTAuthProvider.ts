import IAuthProvider from '@modules/users/providers/AuthProvider/models/IAuthProvider'
import User from '@modules/users/infra/typeorm/entities/User';

class FakeJWTAuthProvider implements IAuthProvider {

  public async sing(user: User): Promise<string> {

    const token = "UHOID*(sa7ffs70saf79faynf7fnyn0y8FFSYFSYFY&FNAY&F&Y&FYS"

    return token
  }

  public async verify(payload: string): Promise<string | object> {

    const response = true
    return { response }
  }

}
export default FakeJWTAuthProvider
