import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import { getRepository, Not, Repository } from 'typeorm';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
    role,
  }: ICreateUserDTO): Promise<User | undefined> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      role,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    this.ormRepository.save(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async find(): Promise<User[] | undefined> {
    const users = await this.ormRepository.find();
    return users;
  }

  public async findAllProvider({
    expept_user_id,
  }: IFindAllProvidersDTO): Promise<User[] | undefined> {
    let users: User[];

    if (expept_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(expept_user_id),
          role: 'Provider',
        },
      });
    } else {
      users = await this.ormRepository.find({
        where: {
          role: 'Provider',
        },
      });
    }
    return users;
  }
}

export default UsersRepository;
