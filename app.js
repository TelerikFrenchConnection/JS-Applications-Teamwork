import $ from 'jquery';
import sammy from 'sammy';

import homeController from './controllers/homeController.js';
import categoriesController from './controllers/categoriesController.js';
import libraryController from './controllers/libraryController.js';
import searchController from './controllers/searchController.js';
import contactController from './controllers/contactController.js';
import loginController from './controllers/loginController.js';
import signupController from './controllers/signupController.js';

export function init(element) {
	var app = sammy(element, function () {
		this.before({}, function () {
			$(element).html('');
        });

		this.get('#/', homeController.load);
		this.get('#/home', homeController.load);

		this.get('#/categories', categoriesController.load);
		this.get('#/categories/:categoryName', categoriesController.load);

		this.get('#/library', libraryController.load);
		this.get('#/library/:bookId', libraryController.load);

		this.get('#/search', searchController.load);
		this.get('#/search/:string', searchController.load);

		this.get('#/contact', contactController.load);

		this.get('#/login', loginController.load);

		this.get('#/signup', signupController.load);
	});

	app.run('#/');
}