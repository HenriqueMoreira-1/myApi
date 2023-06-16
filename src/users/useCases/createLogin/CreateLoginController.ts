import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { CreateLoginUseCase } from './CreateLoginUseCase'

export class CreateLoginController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createLoginUseCase = container.resolve(CreateLoginUseCase)
    const { email, password } = request.body

    const { user, refreshToken, accesstoken } =
      await createLoginUseCase.execute({
        email,
        password,
      })
    return response.status(201).json(
      instanceToInstance({
        user,
        refreshToken,
        accesstoken,
      }),
    )
  }
}
