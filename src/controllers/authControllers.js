import authServices from '../services/authServices.js';

async function signUp(req, res, next) {
  const { name, email, password, telephone, is_doctor, cpf, crm } = req.body;
  try {
    await authServices.signUp({ name, email, password, telephone, is_doctor, cpf, crm });
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export default {
  signUp,
};
