class searchModel {
	filterBy(booksCollection, prop, searchValue) {
		var filteredBooks = [];
		searchValue = searchValue.toLowerCase();

		booksCollection.forEach(function(book) {
			var selectedCategory = book.attributes[prop].toLowerCase();
			if (selectedCategory.indexOf(searchValue) > -1) {
		 		filteredBooks.push(book);
			}
		});

		return filteredBooks;
	};
}

export default new searchModel();
