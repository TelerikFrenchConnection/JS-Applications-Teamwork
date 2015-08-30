import $ from 'jquery';
import sammy from 'sammy';

import homeController from './controllers/homeController.js';
import categoriesController from './controllers/categoriesController.js';
import libraryController from './controllers/libraryController.js';
import searchController from './controllers/searchController.js';
import contactController from './controllers/contactController.js';
import accountController from './controllers/accountController.js';
import exampleController from './controllers/exampleController.js'
import adminController from './controllers/adminController.js';


export function init(element) {
	var app = Sammy(element, function () {
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

        this.get('#/account', accountController.load);
		this.get('#/account/login', accountController.login);
		this.get('#/account/signup', accountController.signup);

        this.get('#/admin', adminController.load);
        this.get('#/admin/addBook', adminController.addBook);

        // this.get('#/example', exampleController.load);
	});

	app.run('#/');
}