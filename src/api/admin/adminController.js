/**
 * Created by pubudud on 3/4/17.
 */

import Decorator from '../../helpers/decorator';
import daemon from '../../daemon';
import {SUCCESS} from '../../helpers/constants';

/**
 * Model class responsible for implementing logic for actions
 * related to application administration on behalf of the Router
 */
class AdminController extends Decorator {


    /**
     * Override the nature of the appendDetails custom prototype function of the Error object
     * @param {object} data - override configs
     *      @param {object} [data.pathOverride] - Whether or not to override the error propagation path
     *      @param {object} [data.causesOverride] - Whether or not to override the error causes list
     * @returns {Promise} - Resolve if proper arguments were sent
     */
    overrideErrorConfig(data) {
        if (!data) {
            let err = new Error("Invalid Parameters");
            err.appendDetails("AdminController", "updateErrorConfig", `${data}`);
            throw err;
        }
        let pathOverrider = data.pathOverride ? "_" : null;
        let causesOverrider = data.causesOverride ? "_" : null;

        return daemon.modifyErrorPrototype(pathOverrider, causesOverrider)
            .then(() => SUCCESS)
            .catch((err) => {
                err.appendDetails("AdminController", "updateErrorConfig");
                throw err;
            });
    }

}

export default new AdminController();
