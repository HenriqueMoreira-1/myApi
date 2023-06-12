import { RolesRepository } from '@roles/repositories/RolesRepository'
import { UserRepository } from '@users/repositories/UserRepository'
import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { container } from 'tsyringe'

container.registerSingleton('UserRepository', UserRepository)
container.registerSingleton('RolesRepository', RolesRepository)

container.registerSingleton('CreateUserController', CreateUserController)
