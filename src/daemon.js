/**
 * Created by pubudud on 1/20/18.
 */

// Core modules
import * as sourceMaps from 'source-map-support';

// Helpers
import logger from './utils/logger';
import {SOURCE_MAPS_SUPPORT} from './helpers/constants';

// Modules that need to be bootstrapped
import MongoDbManager from './databases/mongo/dbManager';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * All daemon services that should be instantiated before starting the https server, or that can be
 * initiated in parallel will be initiated/instantiated here
 */
class Daemon {
    /**
     * Instantiate daemon service proxy
     * @param {object} server - HTTPS Server if in case needed by other services
     */
    init(server) {
        this.server = server;
    }

    /**
     * Instantiate and/or initiate daemon services that are required before starting the https server
     * @returns {Promise} - task success
     */
    initSyncServices() {
        return new Promise((resolve, reject) => {
            this.modifyErrorPrototype()
                .then(this.enableSourceMaps)
                .then(this.initMongoDb)
                .then(resolve)
                .catch((err) => {
                    err.appendDetails("Daemon", "initSyncServices", "Failed while initializing some service");
                    return reject(err);
                });
        });
    }

    /**
     * Instantiate and/or initiate daemon services that run independent of the https server
     */
    initAsyncServices() {
        // Note: Add as necessary
    }

    /**
     * Enable Source-map support in dev environments
     * @returns {Promise} - promise
     */
    enableSourceMaps() {
        return new Promise((resolve) => {
            if (SOURCE_MAPS_SUPPORT) {
                sourceMaps.install();
                return resolve();
            }
            return resolve();
        });
    }

    /**
     * Appends additional details to the standard error object
     * @param {string} [pathOverrider] - String to override the error propagation path
     * @param {string} [causesOverrider] - String to override the error causes list
     * @returns {Promise} - task success
     */
    modifyErrorPrototype(pathOverrider, causesOverrider) {
        return new Promise((resolve) => {
            /**
             * @param {string} className - Name of the module in which the error was detected
             * @param {string} method - Name of the module-method in which the error was detected
             * @param {string} cause - More details about the cause of the error
             */
            Error.prototype.appendDetails = function (className = "*NULL*", method = "*NULL*", cause = "*NULL*") {
                this.path = pathOverrider || (this.path || "#") + ` -> [${className}]|(${method})`;
                this.causes = causesOverrider || (this.causes || "#") + ` -> (${method})|${cause}`;
            };
            return resolve();
        });
    }


    /**
     * Connect to mongodb database
     * @returns {Promise} - success message
     */
    initMongoDb() {
        return new Promise((resolve, reject) => {
            MongoDbManager.init()
                .then((message) => {
                    logger.info(message);
                })
                .then(resolve)
                .catch((err) => {
                    err.appendDetails("Daemon", "initMongoDB");
                    return reject(err);
                });
        });
    }

}

export default new Daemon();
