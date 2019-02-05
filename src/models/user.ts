// https://www.codementor.io/mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import { IUserInstance } from './interfaces';
import { stringTypeGenerator } from './generators';

interface IPrototype {
  prototype: any;
}

const sequelize = new Sequelize(
  `postgres://${process.env.PSQL_USER}:${process.env.PSQL_PASS}@localhost:5432/my-bookmarks`
);

// setup User model and its fields.
const User: any & IPrototype = sequelize.define<IUserInstance, any>(
  'users',
  {
    username: stringTypeGenerator(true, false),
    email: stringTypeGenerator(true, false),
    password: stringTypeGenerator(false, false)
  },
  {
    hooks: {
      beforeCreate: (user: IUserInstance) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  }
);

User.prototype.validPassword = function(password: string) {
  return bcrypt.compareSync(password, this.password);
};

// create all the defined tables in the specified database.
sequelize
  .sync()
  .then(() => console.log('users table has been successfully created, if one doesn\t exist'))
  .catch(error => console.log('This error occured', error));

// export User model for use in other files.
export default User;
