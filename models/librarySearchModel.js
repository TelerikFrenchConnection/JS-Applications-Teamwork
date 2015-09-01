class librarySearchModel {
	filterBy(booksCollection, prop, searchValue) {
		var result = [];
		searchValue = searchValue.toLowerCase();

		booksCollection.forEach(function(book) {
			var selectedCategory = book.attributes[prop].toLowerCase();
			if (selectedCategory.indexOf(searchValue) > -1) {
		 		result.push(book);
			}
		});

		return result;
	};
}

export default new librarySearchModel();
