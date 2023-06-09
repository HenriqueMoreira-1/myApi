import { Request, Response } from 'express'
import { CreateRoleUseCase } from './CreateRoleUseCase'
import { container } from 'tsyringe'

export class CreateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createRoleUseCase = container.resolve(CreateRoleUseCase)
    const { name } = request.body
    const role = await createRoleUseCase.execute({ name })

    return response.status(201).json(role)
  }
}
