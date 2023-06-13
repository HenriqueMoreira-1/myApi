import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/error/AppError'
import { User } from '@users/entities/User'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'

type CreateUserDTO = {
  name: string
  email: string
  password: string
  isAdmin: boolean
  roleId: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}

  async execute({
    name,
    email,
    isAdmin,
    password,
    roleId,
  }: CreateUserDTO): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email)
    const role = await this.rolesRepository.findById(roleId)

    if (emailExists) {
      throw new AppError('Email address already used')
    }
    if (!role) {
      throw new AppError('Role not found', 404)
    }

    const hashedPassword = await hash(password, 10)
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      role,
    })

    return user
  }
}
