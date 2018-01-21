/**
 * Created by pubudud on 6/13/17.
 */

import FileStore from 'session-file-store';
import session from 'express-session';

import {SESSION} from '../helpers/constants';

export default session({
    ...SESSION.EXPRESS,
    store: new FileStore(session)(SESSION.STORE)
});
