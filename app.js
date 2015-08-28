import $ from 'jquery';
import sammy from 'sammy';

import homeController from './controllers/homeController.js';
import categoriesController from './controllers/categoriesController.js';
import libraryController from './controllers/libraryController.js';
import searchController from './controllers/searchController.js';
import contactController from './controllers/contactController.js';
import loginController from './controllers/loginController.js';
import signupController from './controllers/signupController.js';

export function init($element) {
	var app = sammy('#content', function () {
		this.before({}, function () {
			$('#content').html('');
		});

		this.get('#/', function () {
			homeController.load();
		});

		this.get('#/home', function () {
			homeController.load();
		});

		this.get('#/categories', function () {
			categoriesController.load();
		});

		this.get('#/categories/:categoryName', function () {
			var category = this.params['categoryName'];
			categoriesController.load(category);
		});

		this.get('#/library', function () {
			libraryController.load()
		});

		this.get('#/library/:bookId', function () {
			var bookId = this.params['bookId'];
			libraryController.load(bookId)
		});

		this.get('#/search', function () {
			searchController.load()
		});

		this.get('#/search/:string', function () {
			var searchString = this.params['string'];
			searchController.load(searchString);
		});

		this.get('#/contact', function () {
			contactController.load()
		});

		this.get('#/login', function () {
			loginController.load()
		});

		this.get('#/signup', function () {
			signupController.load()
		});
	});

	app.run('#/');
}