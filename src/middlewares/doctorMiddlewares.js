import errors from '../errors/index.js';

async function checkAreDoctor(req, res, next) {
  const user = res.locals.user;

  try {
    if (!user.is_doctor) throw errors.unauthorizedError();
    next();
  } catch (err) {
    next(err);
  }
}

export default {
  checkAreDoctor,
};
