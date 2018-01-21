/**
 * Created by pubudud on 1/20/18.
 *
 * This file loads and exports frequently used configuration constants for ease of reference
 */

import FileUtils from './fileUtils';
import {CONFIG_FILES, PLATFORM_KEYS, SESSION_KEYS, MONGO_KEYS} from './serverConfigs';

const platformConfig = FileUtils.loadConfigs(CONFIG_FILES.PLATFORM),
    sessionConfig = FileUtils.loadConfigs(CONFIG_FILES.SESSION),
    mongoConfig = FileUtils.loadConfigs(CONFIG_FILES.MONGO),
    loggerConfig = FileUtils.loadConfigs(CONFIG_FILES.LOGGER);

// Constants from Platform config
export const SERVER_PORT = platformConfig[PLATFORM_KEYS.PORT];
export const EXTERNAL_API_TIMEOUT = platformConfig[PLATFORM_KEYS.EXTERNAL_API_TIMEOUT];
export const SOURCE_MAPS_SUPPORT = platformConfig[PLATFORM_KEYS.SOURCE_MAPS_SUPPORT];
export const SIGNUP_SECRET = platformConfig[PLATFORM_KEYS.SIGNUP_SECRET];

// logger
export const LOGGER_CONFIG = loggerConfig;

// Constants from session config
export const SESSION = {
    EXPRESS: sessionConfig[SESSION_KEYS.EXPRESS],
    STORE: sessionConfig[SESSION_KEYS.STORE]
};

// Constants from mongo config
export const MONGO = {
    HOST: mongoConfig[MONGO_KEYS.HOST],
    PORT: mongoConfig[MONGO_KEYS.PORT],
    DB: mongoConfig[MONGO_KEYS.DB],
    USERNAME: mongoConfig[MONGO_KEYS.USERNAME],
    PASSWORD: mongoConfig[MONGO_KEYS.PASSWORD]
};
