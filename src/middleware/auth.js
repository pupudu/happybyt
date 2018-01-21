/**
 * Created by pubudud on 6/13/17.
 */

import authController from '../api/auth/authController';
import logger from '../utils/logger';
import {SUCCESS, UNAUTHORIZED} from '../helpers/constants';

export default (req, res, next) => {
    if (!req.isAuthenticated() || !req.user) {
        return res.redirect('/authenticate');
    }
    return authController.validateSession(req.user)
        .then(() => next())
        .catch((err) => {
            err.appendDetails("Is Authenticated", "Middleware");
            logger.error(`${err.message}:${err.path}:${err.causes}`);
            return res.redirect('/authenticate');
        });
};

export const isFetchAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated() || !req.user) {
        return res.status(UNAUTHORIZED).json({
            message: 'HTTP Request was not properly authenticated'
        });
    }
    return next();
};

export const shouldAuthenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return next();
};

export const terminate = (req, res) => res.status(SUCCESS).send({});
