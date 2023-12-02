import * as Joi from 'joi'

export const validationSchema = Joi.object({
    // app
    APP_NAME: Joi.string().required(),
    APP_PORT: Joi.number().required(),
    APP_API_PREFIX: Joi.string().required(),
    APP_MODE: Joi.string().valid('development', 'production'),

    // swagger
    SG_TITLE: Joi.string().required(),
    SG_DESCRIPTION: Joi.string().required(),
    SG_VERSION: Joi.string().required(),
    SG_TAG: Joi.string().required(),
    SG_PREFIX: Joi.string().required(),
    SG_IS_ENABLED: Joi.string().required(),

    // database
    DATABASE_URL: Joi.string().required(),

    // jwt
    JWT_EXP_H: Joi.number().required(),
    JWT_EXP_D: Joi.number().required(),
    JWT_SECRET: Joi.string().required(),
})
