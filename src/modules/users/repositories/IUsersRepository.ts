import User from "../infra/typeorm/entities/User";
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

export default interface IUsersRepository {
    findByEmail(email: string): Promise<User | undefined>
    findById(id: string): Promise<User | undefined>
    create(data: ICreateUserDTO): Promise<User | undefined>
    save(user: User): Promise<User>
    find(): Promise<User[]>
}