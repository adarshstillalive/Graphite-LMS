import { Request, Response, NextFunction } from 'express';
import TokenService from '../../application/services/TokenService.js';
import MongoUserRepository from '../databases/mongoDB/MongoUserRepository.js';
import { createResponse } from '../../utils/createResponse.js';

const userRepository = new MongoUserRepository();
const tokenService = new TokenService(userRepository);

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('Unauthorized: Invalid token');
    }

    const user = await tokenService.verifyToken(authHeader);
    req.user = user;

    next();
  } catch (error) {
    res
      .status(401)
      .json(
        createResponse(false, 'Unauthorized: No token provided', {}, error),
      );
  }
};

export default {
  authorization,
};
