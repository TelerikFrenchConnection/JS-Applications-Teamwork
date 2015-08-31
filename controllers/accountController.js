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
                    var errorObject = {name:"your login details", message: "are invalid"};
                    templatesHelper.appendSingle('warningTemplate', errorObject, '.warning');
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


        var signupResult = userModel.signup(username, password, firstName, lastName, email)
            .then(function(user){
                console.log('success');
                console.log(user);
            }, function(user) {
                console.log('failed');
                console.log(user);
            });

       /* pagesHelper.append('accountSignup')
            .then(function(user){
                console.log('success');
                console.log(user);
            }, function(user) {
                console.log('failed');
                console.log(user);
            });*/
    }

    logout(sammy) {

        sammy.redirect('#/home');
    }
}

export default new accountController();