import { container } from 'tsyringe'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepositorio from '@modules/users/infra/typeorm/repositories/UsersRepositorio'

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentRepository',
    AppointmentRepository
)

container.registerSingleton<IUsersRepository>(
    'UsersRepositorio',
    UsersRepositorio
)