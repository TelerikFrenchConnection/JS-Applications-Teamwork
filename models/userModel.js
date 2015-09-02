import db from './database/dbContext.js';
import User from './viewModels/userViewModel.js';

class userModel {
    signup(userName, password, firstName, lastName, email) {
        var user = new User(userName, password, firstName, lastName, email);
        console.log(user);
        var storage = sessionStorage;
        var parseUser = new Parse.User;

        var promise = new Promise(function(resolve, reject) {

        });

        console.log(storage);
        //return parseUser.signUp(user);
    }

    login(username, password) {
        return Parse.User.logIn(username, password);
    }

    logout() {
        return Parse.User.logOut();
    }
}

export default new userModel;
