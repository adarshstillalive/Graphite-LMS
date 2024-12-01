import { Request, Response, NextFunction } from 'express';

const userResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalJson = res.json;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.json = function (body: any) {
    const response = {
      success: body?.success ?? true,
      message: body?.message || '',
      data: body?.data || {},
      user: req.user || null,
      error: body?.error || null,
    };

    return originalJson.call(this, response);
  };

  next();
};

export default userResponseMiddleware;
