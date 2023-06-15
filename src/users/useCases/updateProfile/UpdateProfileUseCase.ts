import { AppError } from '@shared/error/AppError'
import { User } from '@users/entities/User'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { compare, hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

type UpdateProfileDTO = {
  userId: string
  name: string
  email: string
  password?: string
  old_password?: string
}

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    name,
    email,
    password,
    old_password,
  }: UpdateProfileDTO): Promise<User> {
    const user = await this.userRepository.findById(userId)
    const userUpdateEmail = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new AppError('There is already a user with this email')
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('Old password does not match')
      }

      user.password = await hash(password, 10)
    }

    user.name = name
    user.email = email
    return this.userRepository.save(user)
  }
}
