import express from 'express';
import jwt from 'jsonwebtoken';
import { Model } from 'sequelize';
import User from '../../models/user';
import { IUserInstance } from '../../models/interfaces';

interface IUserMethods {
  validPassword: (password: string) => boolean;
}

export const login = (req: express.Request, res: express.Response) => {
  const username = req.body.username,
    password = req.body.password;

  User.findOne({ where: { username } })
    .then((user: Model<IUserInstance, any> & IUserMethods) => {
      if (!user) {
        res
          .status(500)
          .json({ message: 'Some error occured. Please check your username and password and try it again.' });
      } else if (!user.validPassword(password)) {
        res.status(500).json({ message: 'Some error occured. Please check your password and try it again.' });
      } else {
        const { username, email, id } = (user as any).dataValues;

        jwt.sign({ user }, (process.env.SECRET_KEY_JWT as string), { expiresIn: '1h' }, (err, token) => {
          res.json({
            user: { email, id, username },
            message: 'User logged in',
            token
          });
        });
      }
    })
    .catch((error: Error) => {
      console.log('Error : ', error);
      res.status(400).json({ message: 'Error: something wrong happened trying to login. Please try it again.' });
    });
};
