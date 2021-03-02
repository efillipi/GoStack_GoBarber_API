import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import { v1 as uuid } from 'uuid'

class AppointmentRepository implements IAppointmentRepository {

    private appointments: Appointment[] = [];

    public async findByDate(dateAppointment: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment => appointment.dateAppointment === dateAppointment
        )

        return findAppointment
    }

    public async create({ provider_id, dateAppointment }: ICreateAppointmentDTO): Promise<Appointment | undefined> {

        const appointment = new Appointment()

        Object.assign(appointment, { id: uuid(), dateAppointment, provider_id })

        this.appointments.push(appointment)

        return appointment

    }

    public async find(): Promise<Appointment[] | undefined> {

        return this.appointments
    }
}

export default AppointmentRepository




