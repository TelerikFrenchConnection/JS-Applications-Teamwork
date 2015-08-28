import 'jquery';
import 'parse';

Parse.initialize("QNCJAvVfAkxaHeSdMr0aB2rgIZrtn56qkeWavnKu", "7c8uGlEb0QURsxyTFyYgTKS7br4sb9cj4jpCTVcb");

// For general data add/remove
var data = {
	add: function (dataClass, dataObject) {
		var DataClass = Parse.Object.extend(dataClass);
		var data = new DataClass();
		data.save(dataObject);
	},
	get: function (dataClass, callback) {
		var query = new Parse.Query(Parse.Object.extend(dataClass));
		return query.find().then(callback);
	},
	getQuery: function(dataClass) {
        // Allows usage of Parse sorting functions
		return new Parse.Query(Parse.Object.extend(dataClass));
	}
};

var user = {
	signUp: function(username, password, firstname, lastname, email) {
		var newUser = new Parse.User;

		newUser.signUp({
			username, password, firstname, lastname, email
		}, {
			success: function(user) {},
			error: function(user, error) {}
		});
	},
	login: function(username, password) {
		Parse.User.logIn(username, password, {
			success: function(user) {},
			error: function(user, error) {}
		})
	},
	logout: function() {
		Parse.User.logOut();
	}
};

export default {
	data,
	user
}
