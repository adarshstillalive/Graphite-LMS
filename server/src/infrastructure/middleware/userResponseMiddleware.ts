import { Request, Response, NextFunction } from 'express';

const userResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalJson = res.json;

  res.json = function (body) {
    const enrichedBody = {
      ...body,
      data: { ...body.data, user: req.user || null },
    };
    return originalJson.call(this, enrichedBody);
  };
  next();
};

export default userResponseMiddleware;
