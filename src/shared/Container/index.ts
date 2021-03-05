import { container } from 'tsyringe'

import '@modules/users/providers'

import '@shared/Container/providers'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentRepository',
    AppointmentRepository
)

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
)

container.registerSingleton<IUserTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository
)
