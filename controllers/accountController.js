import _ from 'underscore';
import db from 'dbContext';

import partialHelper from '../views/helpers/partialsHelper.js';
import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import userModel from '../models/userModel.js'

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
        userModel.login(username, password);

        sammy.redirect('#/home');
    }

    signup() {
        pagesHelper.append('accountSignup');
    }

    signupPost() {

    }

    logout(sammy) {

        sammy.redirect('#/home');
    }
}

export default new accountController();