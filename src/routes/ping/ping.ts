import express from 'express';

const ping = (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: 'Pong' });
};

export default ping;
