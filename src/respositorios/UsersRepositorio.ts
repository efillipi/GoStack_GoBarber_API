import User from '../models/User'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
class UsersRepositorio extends Repository<User> {
}


export default UsersRepositorio