import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import AuthUserService from './AuthUserService';
import AppError from '@shared/errors/AppError';

describe('AuthUserService', () => {

    it('must be able to log in to the application', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const authUserService = new AuthUserService(
            fakeUserRepository,
        );

        const createUserService = new CreateUserService(
            fakeUserRepository,
        );


        const new_user = await createUserService.execute({
            email: "user@example.com",
            name: "User Example",
            password: "123456"
        });

        const user = await authUserService.execute({
            email: new_user.email,
            password: "123456"
        });

        expect(user.user).toHaveProperty('id')
        expect(user.user).toHaveProperty('email')
        expect(user.user).toHaveProperty('name')
        expect(user).toHaveProperty('token')
    });


    it('should not be able to log in with invalid password', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const authUserService = new AuthUserService(
            fakeUserRepository,
        );
        const createUserService = new CreateUserService(
            fakeUserRepository,
        );

        const new_user = await createUserService.execute({
            email: "user@example.com",
            name: "User Example",
            password: "123456"
        });

        expect(
            authUserService.execute({
                email: new_user.email,
                password: "12345"
            })
        ).rejects.toBeInstanceOf(AppError);
    });


    it('should not be able to log in with invalid email', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const authUserService = new AuthUserService(
            fakeUserRepository,
        );
        const createUserService = new CreateUserService(
            fakeUserRepository,
        );

        const new_user = await createUserService.execute({
            email: "user@example.com",
            name: "User Example",
            password: "123456"
        });



        expect(
            authUserService.execute({
                email: "user_invalid@example.com",
                password: "123456"
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});