/**
 * Created by pubudud on 6/13/17.
 */

// Import core modules
import express from 'express';

// Import custom modules
import authController from './authController';
import Decorator from '../../helpers/decorator';
import {SUCCESS} from '../../helpers/constants';

let _this;

/**
 * Accept and respond to requests related to application configurations
 * These route endpoints should not be used for tasks related to the general business logic of the app
 */
class AuthRouter extends Decorator {

    /**
     * Constructor
     * @returns {express.Router} - Module express router to be used by the Root express router
     */
    constructor() {
        super();
        _this = this;

        const router = express.Router();

        // API Endpoints of AuthRouter module
        router.get('/logout', _this.logout);
        router.get('/login', _this.redirectToLoginUrl);
        router.post('/signUp', _this.signUpLocalUser);
        router.get('/signUp', _this.redirectToSignUpUrl);
        router.get('/userProfile', _this.getUserProfile);

        return router;
    }

    /**
     * Logout from the app and Salesforce(if logged in)
     * @param {Object} req - http Request
     * @param {Object} res - http Response
     * @returns {Promise} - logout status
     */
    logout(req, res) {
        req.logout();
        return res.status(SUCCESS).json('Logged out successfully');
    }

    /**
     * @param {Object} req - http Request
     * @param {Object} res - http Response
     * @returns {Promise} - user profile
     */
    getUserProfile(req, res) {
        return authController.getUserProfile(req.user)
            .then((profile) => {
                res.status(SUCCESS).json(profile);
            })
            .catch((err) => {
                err.appendDetails("AuthRouter", "getUserProfile");
                _this.logErrorAndRespond(err, res);
            });
    }

    /**
     * @param {Object} req - http Request
     * @param {Object} res - http Response
     * @return {Promise} <-
     */
    redirectToLoginUrl(req, res) {
        return res.redirect("/#/login");
    }

    /**
     * @param {Object} req - http Request
     * @param {Object} res - http Response
     * @return {Promise} <-
     */
    redirectToSignUpUrl(req, res) {
        return res.redirect("/#/signUp");
    }

    /**
     * @param {Object} req - http Request
     * @param {Object} res - http Response
     * @return {Promise} <-
     */
    signUpLocalUser(req, res) {
        return authController.signUpLocalUser(req.body)
            .then((result) => res.status(SUCCESS).json(result))
            .catch((err) => {
                err.appendDetails("AuthRouter", "signUpLocalUser");
                return _this.logErrorAndRespond(err, res);
            });
    }
}

export default new AuthRouter();
