import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
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

        const user = await createUserService.execute({
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
});