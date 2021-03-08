
import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository'
import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from '@modules/users/services/CreateUserService'
import ShowProfileService from '@modules/users/services/ShowProfileService'

import AppError from '@shared/errors/AppError';


let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let updateProfileService: UpdateProfileService
let createUserService: CreateUserService
let showProfileService: ShowProfileService


describe('ShowProfileService', () => {

  beforeEach(() => {

    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(fakeUserRepository, fakeHashProvider);
    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
    showProfileService = new ShowProfileService(fakeUserRepository);

  })

  it('must return data from the logged in profile', async () => {

    const user = await createUserService.execute({
      email: 'user@example.com',
      name: 'User Example',
      password: '123456'
    });

    const user_show = await showProfileService.execute({
      user_id: user.id,
    })

    expect(user_show.name).toBe('User Example')
    expect(user_show.email).toBe('user@example.com')

  });

  it('should not return data from the logged profile', async () => {
    expect(
      showProfileService.execute({
        user_id: '12312.6sd.zxcv'
      })
    ).rejects.toBeInstanceOf(AppError);
  });


});
