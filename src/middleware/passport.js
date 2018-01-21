/**
 * Created by pubudud on 6/13/17.
 */

// Core modules
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

// Custom modules
import authController from '../api/auth/authController';


passport.serializeUser((user, callback) => {
    // Note - A separate temporary storage could be used to store data and serialize only the Id
    // It will reduce the amount of data stored in the passport session
    // Proper serialization should be done if the user base increases
    callback(null, user);
});

passport.deserializeUser((user, callback) => {
    callback(null, user);
});

passport.use(new LocalStrategy((username, password, callback) => {

    authController.authenticateLocalUser(username, password)
        .then(authController.decorateLocalProfile)
        .then((decoratedUser) => callback(null, decoratedUser))
        .catch((err) => {
            err.appendDetails("Passport", "Middleware", "local strategy");
            return callback(err);
        });
}));

export default passport.authenticate('local', {failureRedirect: '/login'});
export const passportInit = passport.initialize();
export const passportSession = passport.authenticate('session');
