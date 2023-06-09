import { createRoleController } from '@roles/useCases/createRole'
import { deleteRoleController } from '@roles/useCases/deleteRole'
import { listRolesController } from '@roles/useCases/listRoles'
import { showRoleController } from '@roles/useCases/showRole'
import { updateRoleController } from '@roles/useCases/updateRole'
import { Router } from 'express'
import {
  createRoleValidation,
  deleteRoleValidation,
  listRolesValidation,
  showRoleValidation,
  updateRoleValidation,
} from '../validation'

const rolesRouter = Router()

rolesRouter.post('/', createRoleValidation, (request, response) => {
  return createRoleController.handle(request, response)
})

rolesRouter.get('/', listRolesValidation, (request, response) => {
  return listRolesController.handle(request, response)
})

rolesRouter.get('/:id', showRoleValidation, (request, response) => {
  return showRoleController.handle(request, response)
})

rolesRouter.put('/:id', updateRoleValidation, (request, response) => {
  return updateRoleController.handle(request, response)
})

rolesRouter.delete('/:id', deleteRoleValidation, (request, response) => {
  return deleteRoleController.handle(request, response)
})

export { rolesRouter }
