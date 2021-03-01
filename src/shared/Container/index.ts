import { container } from 'tsyringe'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentRepository',
    AppointmentRepository
)