import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import { IUserInstance } from '../../models/interfaces';
import { Model } from 'sequelize';
import { check, validationResult } from 'express-validator/check';

interface IUserDataValues {
  dataValues: IUserInstance & {id: string};
}

export const validateSignup = [
  check('username', 'wrong username').exists(),
  check('email', 'wrong email')
    .exists()
    .isEmail(),
  check('password', 'wrong password').exists()
];

const createUser = (req: express.Request, res: express.Response) => {
  const { username, email, password } = req.body as IUserInstance;

  User.create({
    username,
    email,
    password
  })
    .then((user: Model<IUserInstance, {}> & IUserDataValues) => {
      const { email, id, username } = user.dataValues;

      jwt.sign({ user }, 'secretkey-jsonwebtoken', { expiresIn: '1h' }, (err, token) => {
        res.json({
          user: { email, id, username },
          message: 'User logged in',
          token
        });
      });
    })
    .catch((error: Error) => {
      console.log('Error : ', error);
      res.status(400).json({ message: 'Error: something wrong happened trying to signup. Please try it again.' });
    });
};

export const signup = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  createUser(req, res);
};
