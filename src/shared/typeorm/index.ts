import { DataSource } from 'typeorm'
import { CreateRolesTable1686194422328 } from './migrations/1686194422328-CreateRolesTable'
import { Role } from '@roles/entities/Role'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role],
  migrations: [CreateRolesTable1686194422328],
})
