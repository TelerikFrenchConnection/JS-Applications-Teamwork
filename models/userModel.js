import db from './database/dbContext.js';
import User from './viewModels/userViewModel.js';

class userModel {
    signup(userName, password, firstName, lastName, email) {
        var user = new User(userName, password, firstName, lastName, email);
        var storage = sessionStorage;
        var parseUser = new Parse.User;

        return parseUser.signUp(user).then(function() {

        }, function() {

        })
    }

    login(username, password) {
        return Parse.User.logIn(username, password);
    }

    logout() {
        return Parse.User.logOut();
    }
}

export default new userModel;
