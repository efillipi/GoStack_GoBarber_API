import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindallinMonthFromProviderDTO from '@modules/appointments/dtos/IFindallinMonthFromProviderDTO'
import IFindallinDayFromProviderDTO from '@modules/appointments/dtos/IFindallinDayFromProviderDTO'

export default interface IAppointmentRepository {
  findByDate(dateAppointment: Date): Promise<Appointment | undefined>
  findallinMonthFromProvider(data: IFindallinMonthFromProviderDTO): Promise<Appointment[] | undefined>
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  find(): Promise<Appointment[]>
  findallInDayFromProvider(data: IFindallinDayFromProviderDTO): Promise<Appointment[]>
}
