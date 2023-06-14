import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { Router } from 'express'
import { container } from 'tsyringe'
import {
  createLoginValidation,
  createRoleValidation,
  listUsersValidation,
} from '../validation'
import { ListUsersController } from '@users/useCases/listUsers/ListUsersController'
import { CreateLoginController } from '@users/useCases/createLogin/CreateLoginController'

const usersRouter = Router()

const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)

usersRouter.post('/', createRoleValidation, (request, response) => {
  return createUserController.handle(request, response)
})

usersRouter.get('/', listUsersValidation, (request, response) => {
  return listUsersController.handle(request, response)
})

usersRouter.post('/login', createLoginValidation, (request, response) => {
  return createLoginController.handle(request, response)
})

export { usersRouter }
