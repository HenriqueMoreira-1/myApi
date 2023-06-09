import { createRoleController } from '@roles/useCases/createRole'
import { deleteRoleController } from '@roles/useCases/deleteRole'
import { listRolesController } from '@roles/useCases/listRoles'
import { showRoleController } from '@roles/useCases/showRole'
import { updateRoleController } from '@roles/useCases/updateRole'
import { Router } from 'express'

const rolesRouter = Router()

rolesRouter.post('/', (request, response) => {
  return createRoleController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  return listRolesController.handle(request, response)
})

rolesRouter.get('/:id', (request, response) => {
  return showRoleController.handle(request, response)
})

rolesRouter.put('/:id', (request, response) => {
  return updateRoleController.handle(request, response)
})

rolesRouter.delete('/:id', (request, response) => {
  return deleteRoleController.handle(request, response)
})

export { rolesRouter }
