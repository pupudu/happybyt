/**
 * Created by pubudud on 3/26/17.
 */

// Import core modules
import express from 'express';

// Import custom modules
import configModel from './configController';
import Decorator from '../../helpers/decorator';
import * as constants from '../../helpers/constants';

let _this;

/**
 * Accept and respond to requests related to application configurations
 * Typically targeted for the React application to refer to the same configs used by the express application
 */
class ConfigRouter extends Decorator {

    /**
     * Constructor
     * @returns {express.Router} - Module express router to be used by the Root express router
     */
    constructor() {
        super();
        _this = this;

        let router = new express.Router();

        // API Endpoints of ConfigRouter module
        router.get('/config', _this.loadConfig);

        return router;
    }

    /**
     * Fetch the contents of a specified configuration file
     * @param {Object} req - http Request
     * @param {Object} res - http Response
     */
    loadConfig(req, res) {
        configModel.loadConfig(req.query)
            .then((data) => res.status(constants.SUCCESS).send(data))
            .catch((err) => {
                err.appendDetails("ConfigRouter", "loadConfig", "");
                _this.logger.error(`${err.message}:${err.path}:${err.causes}`);
                return res.status(err.statusCode || constants.INTERNAL_ERROR).send({
                    error: err.message,
                    cause: err.cause
                });
            });
    }
}

export default new ConfigRouter();
