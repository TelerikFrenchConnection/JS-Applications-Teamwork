import $ from 'jquery';
import sammy from 'sammy';

import homeController from './controllers/homeController.js';

export function init($element) {
	var app = sammy('#content', function () {
		this.before({}, function() {
			$('#content').html('');
		});

		this.get('#/', function () {
			homeController.load();
		});
		
		this.get('#/home', function () {
			
		});

		this.get('#/categories', function () {
			
		});
		
		this.get('#/categories/:categoryName', function () {
			var category = this.params['categoryName'];
		});

		this.get('#/library', function () {
			
		});
		
		this.get('#/library/:bookId', function () {
			var bookId = this.params['bookId'];
			// Load detailed view of book
		});
		
		this.get('#/search', function() {
			alert('it works!');
		});
		
		this.get('#/search/:string', function() {
			var searchString = this.params['string'];
		});
		
		this.get('#/contact', function() {
			
		});
		
		this.get('#/login', function() {
			
		});
		
		this.get('#/signup', function() {
			
		});
	});
	
	app.run('#/');		
}