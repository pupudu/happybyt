/**
 * Created by pubudud on 1/20/18.
 *
 * All json related functions could go in this module
 */

import {CONFIG_PATHS} from './serverConfigs';

const loadedConfigs = {};

/**
 * All types of operations with files will be done by static methods of this util class
 */
export default class FileUtils {

    /**
     * Reads configurations from a json formatted file
     * @param {!string} name - Filename, with extension, of the configuration to be loaded
     * @returns {object} - Configuration object
     */
    static loadConfigs(name) {
        const env = process.env.NODE_ENV;

        if (loadedConfigs[name]) {
            return loadedConfigs[name];
        }
        loadedConfigs[name] = require(CONFIG_PATHS[env] + name);
        return loadedConfigs[name];
    }

}
