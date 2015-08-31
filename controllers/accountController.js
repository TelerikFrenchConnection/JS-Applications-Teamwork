import _ from 'underscore';
import db from 'dbContext';

import partialHelper from '../views/helpers/partialsHelper.js';
import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

class accountController {
    load(sammy) {
        sammy.redirect('#/account/login')
    }

    login() {
        pagesHelper.append('accountLogin');
    }

    loginPost(sammy) {
        var username = sammy.params['username'];
        var password = sammy.params['password'];
        db.user.login(username, password);

        sammy.redirect('#/home');
    }

    signup() {
        pagesHelper.append('accountSignup');
    }

    signupPost() {

    }

    logout(sammy) {
        db.user.logout();
        sammy.redirect('#/home');
    }
}

export default new accountController();