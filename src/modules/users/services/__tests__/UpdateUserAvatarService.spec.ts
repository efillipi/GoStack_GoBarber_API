import FakeStorageProvider from '@shared/Container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {

  it('must upload the avatar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);

    const user = await fakeUserRepository.create({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456'
    });

    const update_avatar = await updateUserAvatarService.execute({
      avatarFilename: '2c1a59621e68189ed125_maktub1.png',
      user_id: user.id,
    });

    expect(user.avatar).toBe('2c1a59621e68189ed125_maktub1.png');
  });

  it('must upload the avatar, with a valid user', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);

    expect(
      updateUserAvatarService.execute({
        avatarFilename: '2c1a59621e68189ed125_maktub1.png',
        user_id: 'User Example',
      })
    ).rejects.toBeInstanceOf(AppError)
  });

  it('must delete the old avatar when you have to insert a new one', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider);
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUserRepository.create({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456'
    });

    const update_avatar = await updateUserAvatarService.execute({
      avatarFilename: '2c1a59621e68189ed125_maktub1.png',
      user_id: user.id,
    });

    await updateUserAvatarService.execute({
      avatarFilename: '2c1a59621e68189ed125_maktub2.png',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('2c1a59621e68189ed125_maktub1.png')
    expect(user.avatar).toBe('2c1a59621e68189ed125_maktub2.png');
  });

});
