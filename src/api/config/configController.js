/**
 * Created by pubudud on 3/26/17.
 */

import Decorator from '../../helpers/decorator';
import * as constants from '../../helpers/constants';


const configs = {
    platform: {
        PORT: constants.PLATFORM_KEYS.PORT
    }
};

/**
 * Model class responsible for implementing all configuration related data processing on behalf of the Router
 */
class ConfigModel extends Decorator {

    /**
     * Load the requested configuration using the fileUtils module
     *
     * @param {object} data - Request query data
     * @param {string} data.configName - Identifier of the requested configuration
     * @returns {Promise} - config promise
     */
    loadConfig(data) {
        return new Promise(function (resolve, reject) {
            if (!data || !data.configName) {
                let err = new Error("Invalid Parameters");
                err.appendDetails("ConfigModel", "loadConfig", `${JSON.stringify(data)}`);
                err.statusCode = constants.BAD_REQUEST;
                return reject(err);
            }

            if (!configs[data.configName.toLowerCase()]) {
                let err = new Error("Requested configuration not found");
                err.appendDetails("ConfigModel", "loadConfig", `config: ${JSON.stringify(data.configName)}`);
                err.statusCode = constants.NOT_FOUND;
                return reject(err);
            }

            return resolve(configs[data.configName.toLowerCase()]);
        });
    }
}

export default new ConfigModel();
