import { Request, Response } from 'express';
import NewAppointmentService from '@modules/appointments/services/NewAppointmentService';
import ShowAppointments from '@modules/appointments/services/ShowAppointments';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class AppointmentController {
  public async getall(request: Request, response: Response): Promise<Response> {
    const showAppointments = container.resolve(ShowAppointments);
    const { id_client, approved } = request.query;

    const appointments = await showAppointments.execute({
      id_client: id_client as string,
      approved: approved as string,
    });

    return response.status(200).json(classToClass(appointments));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const newAppointmentServices = container.resolve(NewAppointmentService);

    const { provider_id, dateAppointment } = request.body;
    const user_id = request.user.id;

    const appointment = await newAppointmentServices.execute({
      provider_id,
      user_id,
      dateAppointment,
    });

    return response.status(201).json(classToClass(appointment));
  }
}

export default AppointmentController;
