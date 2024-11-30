import User from '../domain/entities/User.ts';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
