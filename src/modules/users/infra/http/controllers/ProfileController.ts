import { Request, Response } from 'express'
import { container } from 'tsyringe'
import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService from '@modules/users/services/ShowProfileService'

class ProfileController {

  public async update(request: Request, response: Response): Promise<Response> {

    const { id } = request.user
    const { name, email, password, old_password } = request.body

    const updateProfileService = container.resolve(UpdateProfileService)

    const profile_update = await updateProfileService.execute({
      user_id: id,
      name,
      email,
      password,
      old_password
    })

    delete profile_update.password

    return response.status(200).json(profile_update)

  }

  public async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.user

    const showProfileService = container.resolve(ShowProfileService)

    const userShow = await showProfileService.execute({
      user_id: id,
    })

    delete userShow.password

    return response.status(200).json(userShow)

  }
}

export default ProfileController;
