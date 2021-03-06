import { Request, Response } from 'express'
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'
import NewAppointmentService from '@modules/appointments/services/NewAppointmentService'
import { container } from 'tsyringe'

class AppointmentController {

  public async getall(request: Request, response: Response): Promise<Response> {

    const appointmentRepository = new AppointmentRepository()

    const appointments = await appointmentRepository.find()

    return response.status(200).json(appointments)
  }

  public async create(request: Request, response: Response): Promise<Response> {

    const newAppointmentServices = container.resolve(NewAppointmentService)

    const {
      provider_id,
      dateAppointment,
    } = request.body;

    const parseData = startOfHour(parseISO(dateAppointment))

    const appointment = await newAppointmentServices.execute({
      provider_id,
      dateAppointment: parseData
    })

    return response.status(201).json(appointment)

  }

}



export default AppointmentController;
