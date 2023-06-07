import { createRoleController } from '@roles/useCases/createRole'
import { listRolesController } from '@roles/useCases/listRoles'
import { Router } from 'express'

const rolesRouter = Router()

rolesRouter.post('/', (request, response) => {
  return createRoleController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  return listRolesController.handle(request, response)
})

export { rolesRouter }
