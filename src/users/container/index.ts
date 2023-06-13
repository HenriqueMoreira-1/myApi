import { UserRepository } from '@users/repositories/UserRepository'
import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { container } from 'tsyringe'

container.registerSingleton('UserRepository', UserRepository)

container.registerSingleton('CreateUserController', CreateUserController)
