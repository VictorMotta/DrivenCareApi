import Joi from 'joi';

export const signUpUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  telephone: Joi.string()
    .pattern(/^\d+$/)
    .length(11)
    .message('O Telefone deve conter exatamente 11 números contando com o 21 na frente.'),
  is_doctor: Joi.boolean().required(),
  cpf: Joi.string()
    .pattern(/^\d+$/)
    .length(11)
    .message('O CPF do paciente deve conter apenas números e 11 caracteres no total.')
    .required(),
  crm: Joi.string()
    .when('is_doctor', { is: true, then: Joi.required() })
    .pattern(/^[A-Za-z0-9]+$/)
    .length(11)
    .message(
      'O CRM do médico deve conter apenas letras e número, sempre iniciando com CRM, e ter um total de 11 caracteres'
    ),
});
