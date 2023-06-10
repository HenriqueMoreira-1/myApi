import { Router } from 'express'
import {
  createRoleValidation,
  deleteRoleValidation,
  listRolesValidation,
  showRoleValidation,
  updateRoleValidation,
} from '../validation'
import { container } from 'tsyringe'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'
import { ListRolesController } from '@roles/useCases/listRoles/ListRolesController'
import { ShowRoleController } from '@roles/useCases/showRole/ShowRoleController'
import { UpdateRoleController } from '@roles/useCases/updateRole/UpdateRoleController'
import { DeleteRoleController } from '@roles/useCases/deleteRole/DeleteRoleController'

const rolesRouter = Router()

const createRoleController = container.resolve(CreateRoleController)
const listRolesController = container.resolve(ListRolesController)
const showRoleController = container.resolve(ShowRoleController)
const updateRoleController = container.resolve(UpdateRoleController)
const deleteRoleController = container.resolve(DeleteRoleController)

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
