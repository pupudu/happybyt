/**
 * Created by pubudud on 3/4/17.
 */

// Import core modules
import express from 'express';

// Import custom modules
import adminModel from './adminController';
import Decorator from '../../helpers/decorator';

let _this;

/**
 * Accept and respond to requests related to application configurations
 * These route endpoints should not be used for tasks related to the general business logic of Pulse
 */
class AdminRouter extends Decorator {

    /**
     * Constructor
     * @returns {Object} - Module express router to be used by the Root express router
     */
    constructor() {
        super();
        _this = this;

        const router = new express.Router();

        // API Endpoints of AdminRouter module
        router.post('/errorConfig', _this.overrideErrorConfig);

        return router;
    }

    /**
     * Override the 'path' or 'causes' attribute of the Error object which is added by the appendDetails prototype function
     * @param {Object} req - http Request
     * @param {Object} res - http Response
     */
    overrideErrorConfig(req, res) {
        adminModel.overrideErrorConfig(req.body)
            .then((statusCode) => res.status(statusCode).send("Error prototype config updated successfully"))
            .catch((err) => {
                err.appendDetails("AdminRouter", "overrideErrorConfig", "");
                _this.logErrorAndRespond(err, res);
            });
    }

}

export default new AdminRouter();
