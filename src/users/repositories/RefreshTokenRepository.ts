import { Repository } from 'typeorm'
import { dataSource } from '@shared/typeorm'
import {
  CreateRefreshTokenDTO,
  IRefreshTokenRepository,
} from './IRefreshTokenRepository'
import { RefreshToken } from '@users/entities/RefreshToken'
import { AppError } from '@shared/error/AppError'

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private repository: Repository<RefreshToken>

  constructor() {
    this.repository = dataSource.getRepository(RefreshToken)
  }

  async create({
    expires,
    token,
    user_id,
    valid,
  }: CreateRefreshTokenDTO): Promise<RefreshToken> {
    const refresh_token = this.repository.create({
      expires,
      token,
      user_id,
      valid,
    })

    return this.repository.save(refresh_token)
  }

  async findByToken(token: string): Promise<RefreshToken> {
    return this.repository.findOneBy({ token })
  }

  async invalidate(refresh_token: RefreshToken): Promise<void> {
    const refreshToken = await this.findByToken(refresh_token.token)

    if (!refreshToken) {
      throw new AppError('Refresh Token not found', 404)
    }

    refreshToken.valid = false
    await this.repository.save(refreshToken)
  }
}
