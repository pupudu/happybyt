/**
 * Created by pubudud on 1/20/18.
 */

export const ENV_PROD = "production";
export const ENV_DEV = "development";
export const ENV_LOCAL = "local";
export const ENV_TEST = "test";

export const CONFIG_PATHS = {
    [ENV_PROD]: "/etc/app_conf/happybyt/webapp/",
    [ENV_DEV]: "/etc/app_conf/happybyt/webapp/",
    [ENV_LOCAL]: `${process.cwd()}/localConfigs/`,
    [ENV_TEST]: `${process.cwd()}/localConfigs/`
};

// File names of config files
export const CONFIG_FILES = {
    PLATFORM: "platform.json",
    SESSION: "session.json",
    MONGO: "mongo.json",
    LOGGER: "logger.json"
};

// Keys of Platform config
export const PLATFORM_KEYS = {
    PORT: "PORT",
    EXTERNAL_API_TIMEOUT: "EXTERNAL_API_TIMEOUT",
    SOURCE_MAPS_SUPPORT: "SOURCE_MAPS_SUPPORT",
    SIGNUP_SECRET: "SIGNUP_SECRET"
};

// Keys of session config
export const SESSION_KEYS = {
    EXPRESS: "EXPRESS",
    STORE: "STORE"
};

// Keys of Mongo Config
export const MONGO_KEYS = {
    HOST: "HOST",
    PORT: "PORT",
    DB: "DB",
    USERNAME: "USERNAME",
    PASSWORD: "PASSWORD"
};

