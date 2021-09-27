import { Request, Response } from 'express';
import CancelAppointmentService from '@modules/appointments/services/CancelAppointmentService';
import { container } from 'tsyringe';

class CancelAppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const cancelAppointmentService = container.resolve(
      CancelAppointmentService,
    );

    const { id } = request.params;
    const user_id = request.user.id;

    await cancelAppointmentService.execute({
      id_Appointment: id,
      user_id,
    });

    return response.status(204).json({});
  }
}

export default CancelAppointmentController;
