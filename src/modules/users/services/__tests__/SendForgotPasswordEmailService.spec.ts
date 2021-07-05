import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import FakeUserTokenRepository from '@modules/users/repositories/Fakes/FakeUserTokenRepository';
import FakeMailProvider from '@shared/Container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('sould be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'user@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be possible to recover the password of a non-existent user', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'user@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('sould generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'user@example.com',
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
