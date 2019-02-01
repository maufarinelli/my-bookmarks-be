import express from 'express';

export const getTokenToVerify = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Get auth header value
  const bearerHeader = req.headers.authorization;

  // Check if bearer is undefined
  if (bearerHeader) {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    (req as express.Request & { token: string }).token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};
