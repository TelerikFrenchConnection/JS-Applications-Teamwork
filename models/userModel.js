import db from './database/dbContext.js';
import User from './viewModels/userViewModel.js';

class userModel {
    signup(title, author, category, isbn, price, pictureURL, description) {
        var user = new User(title, author, category, isbn, price, pictureURL, description);
        var parseUser = new Parse.User;

        parseUser.signUp(user, {
            success: function(user) {},
            error: function(user, error) {}
        }).then(function(user) {

        }, function(user, error) {
            // Add error handling logic
        });
    }

    login(username, password) {
        Parse.User.logIn(username, password, {
            success: function(user) {},
            error: function(user, error) {}
        }).then(function(user) {

        }, function(user, error) {
            // Add error handling logic
        });
    }

    logout() {
        Parse.User.logOut();
    }
}

export default new userModel;
