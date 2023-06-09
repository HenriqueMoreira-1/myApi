import { celebrate, Joi, Segments } from 'celebrate'

const createRoleValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
  }),
})

const listRolesValidation = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
  }),
})

const showRoleValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
})

const updateRoleValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
  }),
})

const deleteRoleValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
})

export {
  createRoleValidation,
  listRolesValidation,
  showRoleValidation,
  updateRoleValidation,
  deleteRoleValidation,
}
