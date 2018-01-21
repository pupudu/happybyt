/**
 * Created by pubudud on 4/20/17.
 */

import {INTERNAL_ERROR} from '../helpers/constants';
import logger from '../utils/logger';

/**
 * Log errors before sending the error response
 * @param {object} err - Error
 * @param {object} req - HTTP request
 * @param {object} res - HTTP response
 * @param {function} next - call to next middleware
 *
 * @returns {*} call to next middleware
 */
export default function (err, req, res, next) {
    res.locals.message = err.message;

    logger.error(`${err.status || INTERNAL_ERROR}: ${err.message} \nEndPoint # -> ${req.method}:${req.url} \nPath ${err.path} \nCauses ${err.causes}`);

    res.status(err.status || INTERNAL_ERROR).json({
        message: err.message,
        ...err
    });

    return next();
}
