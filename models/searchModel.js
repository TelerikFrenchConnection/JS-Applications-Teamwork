import './helpers/validatorHelper.js';

class searchModel {
	filterBy(booksCollection, searchFilter, searchTerm) {
		var filteredBooks = [];

		validate.safeText(searchTerm);
		validate.safeText(searchFilter);

		searchTerm = searchTerm.toLowerCase();

		for (let i = 0; i < booksCollection.length; i++) {
			let book = booksCollection[i];

			if (book.attributes.hasOwnProperty(searchFilter)) {
				let selectedFilter = book.attributes[searchFilter].toLowerCase();

				if (selectedFilter.indexOf(searchTerm) > -1) {
					filteredBooks.push(book);
				}
			}
			else {
				break;
			}
		}
		return filteredBooks;
	};
}

export default new searchModel();
