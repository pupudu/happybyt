/**
 * Created by pubudud on 1/20/18.
 */

import mongoose from 'mongoose';
import {MONGO} from '../../helpers/constants';

/**
 * Mongo DB Manager
 */
export default class DbManager {

    /**
     * Connect to mongo database
     * @returns {Promise} - connection success promise
     */
    static init() {
        return new Promise((resolve, reject) => {

            const host = MONGO.HOST,
                port = MONGO.PORT,
                dbName = MONGO.DB,
                username = MONGO.USERNAME,
                password = MONGO.PASSWORD;

            const MONGO_URL = this.generateMongoUrl({username, password, host, port, dbName});

            mongoose
                .connect(MONGO_URL)
                .then(
                    () => resolve(`MongoDB Connection Success: ${MONGO_URL}`),
                    (err) => {
                        err.appendDetails("DbManager", "init");
                        return reject(err);
                    }
                );
        });
    }

    /**
     * Generate MongoDb Connect URI
     * @param {string} username - pulse user's username
     * @param {string} password - pulse user's password
     * @param {string} host - db host url/ip
     * @param {string|number} port - mongod port
     * @param {string} dbName - database name
     * @return {string} - valid connect uri
     */
    static generateMongoUrl({username, password, host = 'localhost', port, dbName}) {

        if (!dbName) {
            const err = new Error(`Invalid DB name: ${dbName}`);
            err.appendDetails('DbManager', 'init');
            throw err;
        }

        let authString = '';

        if (username && password) {
            authString = `${username}:${password}@`;
        }

        return `mongodb://${authString}${host}:${port}/${dbName}`;
    }
}
