import express from 'express';

const notFound = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('req.originalUrl : ', req.originalUrl);

  res.status(404).send('Sorry can\'t find that!. req.originalUrl is :' + req.originalUrl);
};

export default notFound;
