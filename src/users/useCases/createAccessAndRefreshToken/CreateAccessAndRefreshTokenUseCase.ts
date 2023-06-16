import { AppError } from '@shared/error/AppError'
import { User } from '@users/entities/User'
import { IRefreshTokenRepository } from '@users/repositories/IRefreshTokenRepository'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import jwtConfig from '@config/auth'

type CreateAccessAndRefreshTokenDTO = {
  user_id: string
  refresh_token: string
}

type IResponse = {
  user: User
  accesstoken: string
  refreshToken: string
}

@injectable()
export class CreateAccessAndRefreshToken {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  public async execute({
    refresh_token,
    user_id,
  }: CreateAccessAndRefreshTokenDTO): Promise<IResponse> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const refreshTokenExists = await this.refreshTokenRepository.findByToken(
      refresh_token,
    )

    if (!refreshTokenExists) {
      throw new AppError('Refresh token is required', 401)
    }

    const dateNow = new Date().getTime()

    if (
      !refreshTokenExists.valid ||
      dateNow > refreshTokenExists.expires.getTime()
    ) {
      throw new AppError('Refresh token is invalid/expired', 401)
    }

    await this.refreshTokenRepository.invalidate(refreshTokenExists)

    const accesstoken = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    })

    const expires = new Date(Date.now() + jwtConfig.refreshToken.duration)

    const refreshToken = sign({}, jwtConfig.refreshToken.secret, {
      subject: user.id,
      expiresIn: jwtConfig.refreshToken.expiresIn,
    })

    await this.refreshTokenRepository.create({
      token: refreshToken,
      expires,
      user_id: user.id,
      valid: true,
    })

    return { user, accesstoken, refreshToken }
  }
}
