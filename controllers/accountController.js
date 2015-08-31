import _ from 'underscore';
import db from 'dbContext';

import partialHelper from '../views/helpers/partialsHelper.js';
import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

class accountController {
    load() {
        this.redirect('#/account/login')
    }

    login() {
        pagesHelper.append('accountLogin');
    }

    signup() {
        pagesHelper.append('accountSignup');
    }

    logout() {
        db.data.add()
    }
}

export default new accountController();