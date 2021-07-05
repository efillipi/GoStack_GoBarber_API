import FakeStorageProvider from '@shared/Container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

let fakeStorageProvider: FakeStorageProvider;
let fakeUserRepository: FakeUserRepository;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUserRepository = new FakeUserRepository();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('must upload the avatar', async () => {
    const user = await fakeUserRepository.create({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      avatarFilename: '2c1a59621e68189ed125_maktub1.png',
      user_id: user.id,
    });

    expect(user.avatar).toBe('2c1a59621e68189ed125_maktub1.png');
  });

  it('must upload the avatar, with a valid user', async () => {
    expect(
      updateUserAvatarService.execute({
        avatarFilename: '2c1a59621e68189ed125_maktub1.png',
        user_id: 'User Example',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('must delete the old avatar when you have to insert a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      avatarFilename: '2c1a59621e68189ed125_maktub1.png',
      user_id: user.id,
    });

    await updateUserAvatarService.execute({
      avatarFilename: '2c1a59621e68189ed125_maktub2.png',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('2c1a59621e68189ed125_maktub1.png');
    expect(user.avatar).toBe('2c1a59621e68189ed125_maktub2.png');
  });
});
