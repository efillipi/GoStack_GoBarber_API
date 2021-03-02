import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

export default interface IAppointmentRepository{
    findByDate(dateAppointment: Date) : Promise<Appointment | undefined>
    create(data : ICreateAppointmentDTO) : Promise<Appointment>
    find() : Promise<Appointment[]>
}
