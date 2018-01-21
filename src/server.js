/**
 * Created by pubudud on 1/20/18.
 *
 * All configurations related to the https server implementation should go here
 */

// Core modules
import http from 'http';

// Helpers and Utils
import {INTERNAL_ERROR, SERVER_PORT} from './helpers/constants';

// Internals
import app from './app';
import daemon from './daemon';
import logger from './utils/logger';

// Create HTTPS server and listen on dedicated port
const server = http.createServer(app);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Instantiate daemon service
daemon.init(server);

// Init HTTPS server dependencies and start listening
daemon.initSyncServices()
    .then(() => {
        server.listen(SERVER_PORT, () => {
            logger.info("Listening on port: %s", SERVER_PORT);
        });
    })
    .catch((err) => {
        logger.fatal(`Failed to initialize required services. Process will now exit: ${err.message}`);
        process.exit(1);
    });

// Init asynchronous services
daemon.initAsyncServices();

//Stop process killing on exceptions
process.on('uncaughtException', (err) => {
    logger.fatal('UncaughtException : %s', err.stack ? err.stack : err);
});

server.on('uncaughtException', (req, res, next, err) => {
    logger.error('UncaughtException : %s', err.stack ? err.stack : err);
    return res.status(INTERNAL_ERROR).send(err.message);
});

server.on('error', (err) => {
    logger.fatal('Error : %s', err.stack ? err.stack : err);
    switch (err.code) {
        case 'EACCES':
            process.exit(1);
            break;
        case 'EADDRINUSE':
            process.exit(1);
            break;
    }
});
