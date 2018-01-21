/**
 * Created by pubudud on 1/20/18.
 */

// Core modules
import express from 'express';

//Helpers
import {ENV_PROD, ENV_DEV} from './helpers/constants';

// Middleware
import localAuthenticate from './middleware/passport';
import isAuthenticated, {isFetchAuthenticated, shouldAuthenticate, terminate} from './middleware/auth';

// Routers
import authRouter from './api/auth/authRouter';
import adminRouter from './api/admin/adminRouter';
import configRouter from './api/config/configRouter';

let router = express.Router();

// Middleware(Order matters)
router.post('/login', shouldAuthenticate, localAuthenticate, terminate);

router.get('/login', authRouter);
router.get('/signUp', authRouter);

if (process.env.NODE_ENV === ENV_PROD || process.env.NODE_ENV === ENV_DEV) {
    router.use(isFetchAuthenticated); // naive authentication check for fetch calls in non-local environments
}

// Fetch Routes (Order doesn't matter)
router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/config', configRouter);

// Check authentication with salesforce session validation for file serving only
router.use(isAuthenticated);

export default router;
