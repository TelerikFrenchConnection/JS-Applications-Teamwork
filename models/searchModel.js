import './helpers/validatorHelper.js';

class searchModel {
	filterBy(booksCollection, searchFilter, searchTerm) {
		var filteredBooks = [];

		validate.safeText(searchTerm);
		validate.safeText(searchFilter);

		searchTerm = searchTerm.toLowerCase();

		booksCollection.forEach(function(book) {
			var selectedFilter = book.attributes[searchFilter].toLowerCase();
			if (selectedFilter.indexOf(searchTerm) > -1) {
		 		filteredBooks.push(book);
			}
		});

		return filteredBooks;
	};
}

export default new searchModel();
