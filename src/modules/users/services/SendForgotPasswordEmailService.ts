import User from '@modules/users//infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider';

import { injectable, inject } from 'tsyringe'

interface IRequest {
  email: string;
}

@injectable()
class CreateUser {

  constructor(
    @inject('UsersRepositorio')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {

    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (!emailAlreadyExists) {
      throw new AppError('usuário inexistente', 404)
    }

    await this.userTokenRepository.generate(emailAlreadyExists.id)

    this.mailProvider.sendMail(email, 'nada com nada')

  }

}


export default CreateUser;
