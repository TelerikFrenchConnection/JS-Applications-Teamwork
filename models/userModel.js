import db from './database/dbContext.js';
import _ from 'underscore';

import errorHelper from './helpers/errorHelper.js';
import User from './viewModels/userViewModel.js';

class userModel {
    signup(userName, password, firstName, lastName, email) {
        var user = new User(userName, password, firstName, lastName, email);

        var promise = new Promise(function(resolve, reject) {
            var errors = errorHelper.getErrors();

            if (errors.length === 0) {
                let parseUser = new Parse.User;
                resolve(parseUser.signUp(user))
            } else {
                reject(errors);
            }

            errors = [];
        });

        return promise
    }

    login(username, password) {
        return Parse.User.logIn(username, password);
    }

    logout() {
        return Parse.User.logOut();
    }
}

export default new userModel;
