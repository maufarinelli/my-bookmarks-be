import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import expressValidator from 'express-validator';
import configServer from './server/config';

require('dotenv').config({ path: path.join(process.cwd(), '.env') }); // tslint:disable-line

// routes
import ROUTES from './routes/urls';
import ping from './routes/ping/ping';
import { addBookmark, getBookmarks, deleteBookmark } from './routes/bookmarks/bookmarks';
import notFound from './routes/not-found/not-found';

import ENV from './utils/env';
import { login } from './routes/login/login';
import { signup, validateSignup } from './routes/signup/signup';
import { getTokenToVerify } from './server/token-validation';

const app = express();
configServer(app);

app.use(cors()); // TODO: Remove it in PROD
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser()); // TODO: verify if it still needed

// Routes
app.get('/', getBookmarks);
app.get(ROUTES.ping, ping);
app.post(ROUTES.signup, validateSignup, signup);
app.post(ROUTES.login, login);
app.post(ROUTES.addBookmark, getTokenToVerify, addBookmark);
app.get(ROUTES.getBookmarks, getTokenToVerify, getBookmarks);
app.post(ROUTES.deleteBookmark, getTokenToVerify, deleteBookmark);
app.use(notFound); // route for handling 404 requests(unavailable routes)

// Start server
app.listen(ENV.PORT, () => {
  console.log(`App IS running on port : ${ENV.PORT}`);
});

module.exports = app;
