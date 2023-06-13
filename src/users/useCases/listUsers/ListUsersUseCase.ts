import {
  IUsersRepository,
  UsersPaginateProperties,
} from '@users/repositories/IUsersRepository'
import { injectable, inject } from 'tsyringe'

type ListUsersUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    page,
    limit,
  }: ListUsersUseCaseParams): Promise<UsersPaginateProperties> {
    const take = limit
    const skip = (page - 1) * limit

    return this.usersRepository.findAll({ page, skip, take })
  }
}
