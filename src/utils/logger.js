/**
 * Created by pubudud on 1/20/18.
 */

import {createLogger} from 'bunyan';
import bFormat from 'bunyan-format';
import {LOGGER_CONFIG} from './configConstants';

//Format the bunyan logger
LOGGER_CONFIG["streams"].push({
    "stream": bFormat({outputMode: 'short'})
});

export default createLogger(LOGGER_CONFIG);
