/**
 * Created by pubudud on 2/27/17.
 */

import logger from '../utils/logger';
import {INTERNAL_ERROR} from './constants';

/**
 * Decorator class with reusable utils embedded to be extended by all other modules
 */
export default class Decorator {

    /**
     * Decorate instances of classes which extend this class
     * @constructor
     */
    constructor() {
        this.logger = logger;
        this.logError = this.logError.bind(this);
        this.logErrorAndRespond = this.logErrorAndRespond.bind(this);
    }

    /**
     * Log error in preferred format
     * @param {object} err - instance of Error
     */
    logError(err) {
        this.logger.error(`${err.message} \nPath ${err.path} \nCauses ${err.causes}`);
    }

    /**
     * Log error and send error response in preferred formats
     *
     * @param {object} err - instance of Error
     * @param {object} res - HTTP Response object
     * @returns {object} - HTTP response
     */
    logErrorAndRespond(err, res) {
        this.logError(err);
        return res.status(err.status || INTERNAL_ERROR).json({
            error: err.message,
            ...err
        });
    }
}
