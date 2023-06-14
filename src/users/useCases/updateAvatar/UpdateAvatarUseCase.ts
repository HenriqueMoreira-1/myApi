import { inject, injectable } from 'tsyringe'
import path from 'node:path'
import { AppError } from '@shared/error/AppError'
import { User } from '@users/entities/User'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import uploadConfig from '@config/upload'
import fs from 'node:fs'

type UpdateAvatarDTO = {
  userId: string
  avatarFilename: string
}

@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
  ) {}

  async execute({ avatarFilename, userId }: UpdateAvatarDTO): Promise<User> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename
    return this.userRepository.save(user)
  }
}
