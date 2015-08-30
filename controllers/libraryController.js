import _ from 'underscore';
import db from '../models/db.js';

// import OOP models for library page

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import Book from '../models/book.js';

var libraryController = (function() {
	function load() {
		pagesHelper.append('library');

		var someBook = new Book('Warcraft',
			 'BlizzardGuy',
		 	 'Fantasy',
			 '1235623',
			 52,
			 '../assets/images/warcraftCover.jpg',
			 'cool book');

		// db.data.add('Book', someBook);

		db.data.get('Book', function(allBooks) {
			allBooks.forEach(function(currentBook) {
				templatesHelper.append('libraryBookTemplate', currentBook, '#library-content');
			})
		});

		/*
		var query = db.data.getQuery('Book');
		query.limit(1);
		query.find().then(function(result){
		    console.log(result);
		})*/
	}

	return load;
})();

export default {
	load: libraryController
}