import errors from '../errors/index.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import authRepositories from '../repositories/authRepositories.js';

export default async function authenticationValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) throw errors.unauthorizedError();

  const parts = authorization.split(' ');
  if (parts.length !== 2) throw errors.unauthorizedError();

  const [schema, token] = parts;
  if (schema !== 'Bearer') throw errors.unauthorizedError();

  jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
    try {
      if (error) throw errors.unauthorizedError();

      const {
        rows: [user],
      } = await authRepositories.findById(decoded.userId);

      if (!user) throw errors.unauthorizedError();

      res.locals.user = user;

      next();
    } catch (err) {
      next(err);
    }
  });
}
