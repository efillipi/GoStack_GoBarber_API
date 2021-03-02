import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository'
import CreateUserService from '@modules/users/services/CreateUserService'
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {

    it('should be able to create a new User', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUserService = new CreateUserService(
            fakeUserRepository,
        );

        const user = await createUserService.execute({
            email: "user@example.com",
            name: "User Example",
            password: "123456"
        });

        expect(user).toHaveProperty('id');
        expect(user.email).toBe("user@example.com")
        expect(user.name).toBe("User Example")

    });

    it('should not be able to create a new user with the same email', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUserService = new CreateUserService(
            fakeUserRepository,
        );

        await createUserService.execute({
            email: "user@example.com",
            name: "User Example",
            password: "123456"
        });

        expect(
            createUserService.execute({
                email: "user@example.com",
                name: "User Example",
                password: "123456"
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Show appointments', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUserService = new CreateUserService(
            fakeUserRepository,
        );

        await createUserService.execute({
            email: "user@example.com",
            name: "User Example",
            password: "123456"
        });

        const users = await fakeUserRepository.find()

        expect(users.length).toBe(1)
    });
});