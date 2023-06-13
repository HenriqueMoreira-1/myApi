import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { Router } from 'express'
import { container } from 'tsyringe'
import { createRoleValidation } from '../validation'

const usersRouter = Router()
const createUserController = container.resolve(CreateUserController)

usersRouter.post('/', createRoleValidation, (request, response) => {
  return createUserController.handle(request, response)
})

export { usersRouter }
