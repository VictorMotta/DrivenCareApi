import authServices from '../services/authServices.js';

async function signUp(req, res, next) {
  const { name, email, password, telephone, is_doctor, cpf, crm } = req.body;
  try {
    await authServices.signUp({ name, email, password, telephone, is_doctor, cpf, crm });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await authServices.signIn({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  signUp,
  signIn,
};
