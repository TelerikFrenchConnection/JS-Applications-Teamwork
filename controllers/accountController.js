import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';
// import OOP models for login page

var accountController = (function() {
    function load() {
        pagesHelper.append('accountLogin');
    }

    function login() {
        pagesHelper.append('accountLogin');
    }

    function signup() {

    }

    function logout() {

    }

    return {
        load,
        login,
        signup,
        logout
    }
})();

export default accountController;