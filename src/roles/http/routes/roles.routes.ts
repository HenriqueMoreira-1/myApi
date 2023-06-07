import { RolesRepository } from '@roles/repositories/RolesRepository'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'
import { Router } from 'express'
const rolesRouter = Router()

const createRoleController = new CreateRoleController()
const rolesRepository = new RolesRepository()

rolesRouter.post('/', (request, response) => {
  return createRoleController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  const roles = rolesRepository.findAll()
  return response.status(200).json(roles)
})

export { rolesRouter }
