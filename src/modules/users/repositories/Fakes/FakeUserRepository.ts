import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import { v1 as uuid } from 'uuid';

class FakeUserRepository implements IUsersRepository {
  private Users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const findByEmail = this.Users.find(user => user.email === email);

    return findByEmail;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findById = this.Users.find(user => user.id === id);

    return findById;
  }

  public async findAllProvider({
    expept_user_id,
  }: IFindAllProvidersDTO): Promise<User[] | undefined> {
    let users = this.Users;
    if (expept_user_id) {
      users = this.Users.filter(user => user.id !== expept_user_id);
    }
    return users;
  }

  public async save(user: User): Promise<User> {
    const FindIndex = this.Users.findIndex(findUser => findUser.id === user.id);

    this.Users[FindIndex] = user;

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User | undefined> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    this.Users.push(user);

    return user;
  }

  public async find(): Promise<User[] | undefined> {
    return this.Users;
  }
}

export default FakeUserRepository;
