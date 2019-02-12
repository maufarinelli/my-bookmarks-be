// https://www.codementor.io/mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3
import Sequelize from 'sequelize';
import { stringTypeGenerator } from './generators';
import { IBookmark } from './interfaces';

const sequelize = new Sequelize(
  `postgres://${process.env.PSQL_USER}:${process.env.PSQL_PASS}@localhost:5432/my-bookmarks`
);

const BookMark = sequelize.define<IBookmark, {}>('bookmarks', {
  url: stringTypeGenerator(true, false),
  category: stringTypeGenerator(false, false)
});

// create all the defined tables in the specified database.
sequelize
  .sync()
  .then(() => console.log('bookmarks table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('This error occured', error));

// export User model for use in other files.
export default BookMark;
