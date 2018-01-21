/**
 * Created by pubudud on 1/20/18.
 */

// Core modules
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import compression from 'compression';

// Custom modules
import router from './router';
import errorHandler from './middleware/errorHandler';
import $404Handler from './middleware/404Handler';
import session from './middleware/session';
import {passportInit, passportSession} from './middleware/passport';

let app = express();

// Use middleware as required
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express session
app.use(session);

// Passport auth
app.use(passportInit);
app.use(passportSession);

// gZip compression
app.use(compression());

// Public directory
app.use(express.static(path.join(__dirname, './web-app')));

// Base router
app.use('/', router);

// Catch 404 and forward to error handler
app.use($404Handler);

// Main error handler
app.use(errorHandler);

export default app;
