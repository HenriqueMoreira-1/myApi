import { celebrate, Joi, Segments } from 'celebrate'

const createRoleValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
    roleId: Joi.string().uuid().required(),
  }),
})

const listUsersValidation = celebrate({
  [Segments.QUERY]: {
    page: Joi.number(),
    limit: Joi.number(),
  },
})

export { createRoleValidation, listUsersValidation }
