import { Router } from 'express'
import { rolesRouter } from '@roles/http/routes/roles.routes'
import { usersRouter } from '@users/http/routes/users.routes'
const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

routes.use('/roles', rolesRouter)
routes.use('/users', usersRouter)

export { routes }
