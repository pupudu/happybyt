/**
 * Created by pubudud on 6/12/17.
 */

import bCrypt from 'bcrypt';

import userDao from '../../databases/mongo/user/userDao';
import {SIGNUP_SECRET} from '../../utils/configConstants';

/**
 * Authentication Controller for controlling the auth flow
 */
class AuthController {

    /**
     * Extract required fields from the user object and build a new public profile to be exposed
     *
     * @param {string} email - email
     * @param {string} picture - profile pic (large)
     * @param {string} thumbnail - profile pic (small)
     * @param {string} profileType - enum(salesforce, local, etc based on passport strategies)
     * @param {string} userId - salesforce Id of the user
     *
     * @returns {Promise.<{email, picture, thumbnail, profileType}>} - public profile
     */
    getUserProfile({email, picture, thumbnail, profileType, userId} = {}) {

        // Placeholder for the result to be returned
        let decoratedUser;

        return new Promise((resolve, reject) => {
            userDao
                .getUserById({userId})
                .then((dbUser) => {
                    if (dbUser === null) {
                        // Add entry to user store if not already added
                        return userDao.addUser({userId, profileType, email});
                    }
                    return dbUser;
                })
                .then(({permissions, settings, alertConfigs, updatedTime}) => {
                    decoratedUser = {
                        // Attrs from req.user
                        userId,
                        email,
                        profileType,
                        picture,
                        thumbnail,

                        // Attrs from user store
                        permissions,
                        settings,
                        alertConfigs,
                        updatedTime
                    };
                })
                .then(() => {
                    if (profileType === "local") {
                        return resolve(decoratedUser);
                    }
                })
                .then(resolve)
                .catch((err) => {
                    err.appendDetails("AuthController", "getUserProfile");
                    return reject(err);
                });
        });
    }

    /**
     * Authenticate username and password against the local user store
     *
     * @param {string} username <-
     * @param {string} password <-
     * @return {Promise} - user object
     */
    authenticateLocalUser(username, password) {

        const $scope = {};

        return new Promise((resolve, reject) => {
            userDao
                .getUserById({userId: username})
                .then((dbUser) => {

                    if (!dbUser) {
                        let err = new Error(`No user found for username: ${username}`);
                        err.appendDetails("AuthController", "authenticateLocalUser");
                        return reject(err);
                    }

                    let {userId, email, passwordHash} = dbUser;
                    $scope.passwordHash = passwordHash;

                    return bCrypt.compare(password, $scope.passwordHash)
                        .then((isMatching) => {
                            if (isMatching === true) {
                                return resolve({
                                    userId,
                                    email
                                });
                            }
                            let err = new Error(`Incorrect Password for user: ${username}`);
                            err.appendDetails("AuthController", "authenticateLocalUser");
                            return reject(err);
                        })
                        .catch((err) => {
                            let overrideErr = new Error("Error while checking password. Are the credentials correct?");
                            overrideErr.appendDetails("AuthController", "authenticateLocalUser", err.message);
                            return reject(overrideErr);
                        });
                })
                .catch((err) => {
                    err.appendDetails("AuthController", "authenticateLocalUser", "userdao");
                    return reject(err);
                });
        });
    }

    /**
     * Decorate user profile with default additional data
     * @param {Object} user - initial user object from user store
     * @returns {Promise} - decorated user object
     */
    decorateLocalProfile(user) {
        return Promise.resolve({
            ...user,
            picture: 'img/avatars/default.jpg',
            thumbnail: 'img/avatars/default.jpg',
            profileType: "local"
        });
    }

    /**
     * SignUp a new local user
     * @param {string} username <-
     * @param {string} password <-
     * @param {Array} permissions <-
     * @param {string} signUpSecret <-
     * @return {Promise} <-
     */
    signUpLocalUser({username, password, permissions = [], signUpSecret}) {
        const SALT_ROUNDS = 10;

        return new Promise((resolve, reject) => {

            if (!username || !password) {
                let err = new Error("Insufficient user information");
                err.appendDetails("AuthController", "signUpLocalUser", `username: ${username}, password: ${password}`);
                return reject(err);
            }

            if (signUpSecret !== SIGNUP_SECRET) {
                let err = new Error("Invalid signUp secret");
                err.appendDetails("AuthController", "signUpLocalUser");
                return reject(err);
            }

            return bCrypt.hash(password, SALT_ROUNDS)
                .then((passwordHash) => ({
                    userId: username,
                    email: username,
                    profileType: "local",
                    permissions,
                    passwordHash
                }))
                .then(userDao.addUser)
                .then(resolve)
                .catch((err) => {
                    err.appendDetails("AuthController", "signUpLocalUser");
                    return reject(err);
                });
        });
    }
}

export default new AuthController();
