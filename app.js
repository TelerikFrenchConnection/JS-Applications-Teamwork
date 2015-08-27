import $ from 'jquery';
import sammy from 'sammy';

export function init($element) {
	var app = sammy('#content',function () {
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
	});
	
	app.run('#/');		
}