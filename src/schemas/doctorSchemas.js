import joi from 'joi';

export const insertSpecialtySchema = joi.object({
  specialty: joi.string().required(),
});
