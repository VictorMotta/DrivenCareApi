import joi from 'joi';

export const insertSpecialtySchema = joi.object({
  specialty: joi.string().required(),
});

export const insertHorarySchema = joi.object({
  time: joi.date().required(),
});
