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

const createLoginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
})

const updateProfileValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string().optional(),
    password_confirmation: Joi.string()
      .valid(Joi.ref('password'))
      .when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
  },
})

const createAccessAndRefreshTokenValidation = celebrate({
  [Segments.BODY]: {
    refresh_token: Joi.string().required(),
  },
})

export {
  createRoleValidation,
  listUsersValidation,
  createLoginValidation,
  updateProfileValidation,
  createAccessAndRefreshTokenValidation,
}
