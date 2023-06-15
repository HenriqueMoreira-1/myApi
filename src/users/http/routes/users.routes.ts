import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { Router } from 'express'
import { container } from 'tsyringe'
import multer from 'multer'
import {
  createLoginValidation,
  createRoleValidation,
  listUsersValidation,
  updateProfileValidation,
} from '../validation'
import { ListUsersController } from '@users/useCases/listUsers/ListUsersController'
import { CreateLoginController } from '@users/useCases/createLogin/CreateLoginController'
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated'
import uploadConfig from '@config/upload'
import { UpdateAvatarController } from '@users/useCases/updateAvatar/UpdateAvatarController'
import { ShowProfileController } from '@users/useCases/showProfile/ShowProfileController'
import { UpdateProfileController } from '@users/useCases/updateProfile/UpdateProfileController'

const usersRouter = Router()

const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)
const updateAvatarController = container.resolve(UpdateAvatarController)
const showProfileController = container.resolve(ShowProfileController)
const updateProfileController = container.resolve(UpdateProfileController)

const upload = multer(uploadConfig)

usersRouter.post(
  '/',
  isAuthenticated,
  createRoleValidation,
  (request, response) => {
    return createUserController.handle(request, response)
  },
)

usersRouter.get(
  '/',
  isAuthenticated,
  listUsersValidation,
  (request, response) => {
    return listUsersController.handle(request, response)
  },
)

usersRouter.post('/login', createLoginValidation, (request, response) => {
  return createLoginController.handle(request, response)
})

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    return updateAvatarController.handle(request, response)
  },
)

usersRouter.get('/profile', isAuthenticated, (request, response) => {
  return showProfileController.handle(request, response)
})

usersRouter.put(
  '/profile',
  isAuthenticated,
  updateProfileValidation,
  (request, response) => {
    return updateProfileController.handle(request, response)
  },
)

export { usersRouter }
