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
        userModel.login(username, password)
            .then(function(user) {
                sammy.redirect('#/home');
            }, function(user, error, storage) {
                pagesHelper.append('accountLogin').then(function(){
                    $('.warning').append($('<h1/>').html('Invalid login credentials!').css('color', 'black'));
                });
            })
    }

    signup() {
        pagesHelper.append('accountSignup');
    }

    signupPost(sammy) {
        var username = sammy.params['username'];
        var password = sammy.params['password'];
        var email = sammy.params['email'];
        var firstName = sammy.params['fname'];
        var lastName = sammy.params['lname'];

        userModel.signup(username, password, firstName, lastName, email);
    }

    logout(sammy) {

        sammy.redirect('#/home');
    }
}

export default new accountController();