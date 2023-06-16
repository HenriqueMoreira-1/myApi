import { DataSource } from 'typeorm'
import { CreateRolesTable1686194422328 } from './migrations/1686194422328-CreateRolesTable'
import { Role } from '@roles/entities/Role'
import { CreateUsersTable1686359793425 } from './migrations/1686359793425-CreateUsersTable'
import { AddRoleIdToUsersTable1686360415239 } from './migrations/1686360415239-AddRoleIdToUsersTable'
import { User } from '@users/entities/User'
import { CreateRefreshTokensTable1686925153136 } from './migrations/1686925153136-CreateRefreshTokensTable'
import { RefreshToken } from '@users/entities/RefreshToken'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role, User, RefreshToken],
  migrations: [
    CreateRolesTable1686194422328,
    CreateUsersTable1686359793425,
    AddRoleIdToUsersTable1686360415239,
    CreateRefreshTokensTable1686925153136,
  ],
})
