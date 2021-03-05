import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider';

import { injectable, inject } from 'tsyringe'

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {

    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (!emailAlreadyExists) {
      throw new AppError('usuário inexistente', 404)
    }

    const { token } = await this.userTokenRepository.generate(emailAlreadyExists.id)

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido: ${token}`,
    );

  }

}


export default SendForgotPasswordEmailService;
