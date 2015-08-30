import _ from 'underscore';
import db from 'dbContext';

// import OOP models for library page

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import Book from '../models/bookModel.js';

var libraryController = (function() {
	function load() {
		pagesHelper.append('library');

		// var someBook = new Book('Warcraft',
		// 	 'BlizzardGuy',
		//  	 'Fantasy',
		// 	 '1235623',
		// 	 52,
		// 	 '../assets/images/warcraftCover.jpg',
		// 	 'cool book');

		// db.data.add('Book', someBook);

		db.data.get('Book', function(allBooks) {
			allBooks.forEach(function(currentBook) {
				templatesHelper.append('libraryBookTemplate', currentBook, '#library-content');
			});
		});
	}

	return load;
})();

export default {
	load: libraryController
}