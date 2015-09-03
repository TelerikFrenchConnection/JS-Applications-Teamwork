import './helpers/validatorHelper.js';

class searchModel {
	filterBy(booksCollection, searchFilter, searchTerm) {
		var filteredBooks = [];

		validate.safeText(searchTerm);
		validate.safeText(searchFilter);

		searchTerm = searchTerm.toLowerCase();

		if (booksCollection.length > 0) {
			let firstBook = booksCollection[0];
			if (firstBook.attributes.hasOwnProperty(searchFilter)) {
				booksCollection.forEach(function(book) {
					var selectedFilter = book.attributes[searchFilter].toLowerCase();

					if (selectedFilter.indexOf(searchTerm) > -1) {
						filteredBooks.push(book);
					}
				});
			}
		}

		return filteredBooks;
	}
}

export default new searchModel();
