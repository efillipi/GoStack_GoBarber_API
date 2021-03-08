
import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository'
import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from '@modules/users/services/CreateUserService'
import AppError from '@shared/errors/AppError';


let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let updateProfileService: UpdateProfileService
let createUserService: CreateUserService


describe('UpdateProfileService.spec', () => {

  beforeEach(() => {

    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(fakeUserRepository, fakeHashProvider);
    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

  })

  it('should be able to update the profile ', async () => {

    const user = await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456'
    });

    const user_update = await updateProfileService.execute({
      user_id: user.id,
      email: 'user_update@example.com',
      name: 'User Update Example',
    });

    expect(user_update.email).toBe('user_update@example.com')
    expect(user_update.name).toBe('User Update Example')

  });

  it('should not be able to change to another user email ', async () => {

    const user = await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123'
    });

    const user2 = await createUserService.execute({
      email: 'user2@example.com',
      name: 'User2 Example',
      password: '123456'
    });

    await expect(
      updateProfileService.execute({
        user_id: user2.id,
        email: user.email,
        name: 'User Update Example',
      })

    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change information for a non-existent user', async () => {

    const user = await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456'
    });

    await expect(
      updateProfileService.execute({
        user_id: 'user.ia121412412',
        email: 'user_update@example.com',
        name: 'User Update Example',
      })

    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password ', async () => {

    const user = await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456'
    });

    const user_update = await updateProfileService.execute({
      user_id: user.id,
      email: 'user_update@example.com',
      name: 'User Update Example',
      password: '123',
      old_password: '123456'
    });

    expect(user_update.password).toBe('123')

  });

  it('should not be able to update the password without the old password being entered ', async () => {

    const user = await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456'
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'user_update@example.com',
        name: 'User Update Example',
        password: '123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password if the old password is incorrect ', async () => {

    const user = await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456'
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'user_update@example.com',
        name: 'User Update Example',
        old_password: '12345',
        password: '123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
