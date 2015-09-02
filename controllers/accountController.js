import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import userModel from '../models/userModel.js';

class accountController {
    load(sammy) {
        sammy.redirect('#/account/login');
    }

    login() {
        pagesHelper.append('accountLogin');
    }

    signup() {
        pagesHelper.append('accountSignup');
    }

    loginPost(sammy) {
        var username = sammy.params['username'];
        var password = sammy.params['password'];

        userModel.login(username, password)
            .then(function(user) {
                sammy.redirect('#/home');
            }, function(user, error, storage) {
                var errorObject = {name:"login credentials", message: "are invalid"};
                templatesHelper.setSingle('warning', errorObject, '.warning');
            });
    }

    signupPost(sammy) {
        var username = sammy.params['username'];
        var password = sammy.params['password'];
        var email = sammy.params['email'];
        var firstName = sammy.params['fname'];
        var lastName = sammy.params['lname'];

        userModel.signup(username, password, firstName, lastName, email)
            .then(function(userPromise) {
                return userPromise;
            }).then(function(user) {
                sammy.redirect('#/account/login');
            }).catch(function(errors) {
                templatesHelper.set('warning', errors, '.warning');
            });
    }

    logout(sammy) {
        userModel.logout().then(function(){
            sammy.redirect('#/home');
        });
    }
}

export default new accountController();