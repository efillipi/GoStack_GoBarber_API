import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import { injectable, inject } from 'tsyringe'

interface IRequest {
    provider_id: string
    dateAppointment: Date;
}

@injectable()
class NewAppointmentService {

    constructor(
        @inject('AppointmentRepository')
        private appointmentsRepository: IAppointmentRepository,
    ) { }

    public async execute({ provider_id, dateAppointment, }: IRequest): Promise<Appointment> {

        const findByDate = await this.appointmentsRepository.findByDate(
            dateAppointment
        )

        if (findByDate) {
            throw new AppError('Este Horario já está agendado')
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            dateAppointment
        })

        return appointment
    }

}


export default NewAppointmentService;