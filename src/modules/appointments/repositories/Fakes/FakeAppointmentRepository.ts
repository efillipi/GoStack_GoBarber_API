import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindallinMonthFromProviderDTO from '@modules/appointments/dtos/IFindallinMonthFromProviderDTO'
import IFindallinDayFromProviderDTO from '@modules/appointments/dtos/IFindallinDayFromProviderDTO'
import { v1 as uuid } from 'uuid'
import { isEqual, getMonth, getYear, getDate } from 'date-fns'

class AppointmentRepository implements IAppointmentRepository {

  private appointments: Appointment[] = [];

  public async findByDate(dateAppointment: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.dateAppointment, dateAppointment)
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

  public async findallinMonthFromProvider({ provider_id, year, month }: IFindallinMonthFromProviderDTO): Promise<Appointment[] | undefined> {

    const appointments = this.appointments.filter(
      appointment => {
        return (
          appointment.provider_id === provider_id &&
          getMonth(appointment.dateAppointment) + 1 === month &&
          getYear(appointment.dateAppointment) === year
        )
      }
    )

    return appointments
  }

  public async findallInDayFromProvider({ provider_id, year, month, day }: IFindallinDayFromProviderDTO): Promise<Appointment[] | undefined> {

    const appointments = this.appointments.filter(
      appointment => {
        return (
          appointment.provider_id === provider_id &&
          getDate(appointment.dateAppointment) === day &&
          getMonth(appointment.dateAppointment) + 1 === month &&
          getYear(appointment.dateAppointment) === year
        )
      }
    )

    return appointments
  }
}

export default AppointmentRepository




