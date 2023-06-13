import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { Router } from 'express'
import { container } from 'tsyringe'
import { createRoleValidation, listUsersValidation } from '../validation'
import { ListUsersController } from '@users/useCases/listUsers/ListUsersController'

const usersRouter = Router()
const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)

usersRouter.post('/', createRoleValidation, (request, response) => {
  return createUserController.handle(request, response)
})

usersRouter.get('/', listUsersValidation, (request, response) => {
  return listUsersController.handle(request, response)
})

export { usersRouter }
