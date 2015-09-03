import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import bookModel from '../models/bookModel.js';
import searchModel from '../models/searchModel.js';

class libraryController {
    load(sammy) {
        sammy.redirect('#/library/categories/all');
    }

    category(sammy) {
        var allBooks = bookModel.getBooks();
        var category = sammy.params['category'];
        var categories = [];

        pagesHelper.append('library');
        allBooks.find()
            .then(function(books) {
                books.forEach(function(book) {
                    let category = book.attributes.category.capitalizeFirst();
                    if (categories.indexOf(category) < 0) {
                        categories.push(category);
                    }
                });

                return templatesHelper.append('optionCategory', categories, '#book-category');
            })
            .then(function() {
                $('#book-category').change(function() {
                    var optionSelected = $(this).find(':selected');
                    var category = optionSelected.attr('value');

                    sammy.redirect('#/library/categories/' + category.toLowerCase());
                });
            })
            .then(function() {
                var libraryBookContent = $('#library-content');

                $('select').val(category.capitalizeFirst());

                libraryBookContent.on('click', 'div img', function() {
                    var id = $(this).attr('data-id');
                    sammy.redirect('#/library/detailed/' + id);
                });
            });

        if (category === 'all') {
            allBooks = allBooks.find();
        } else {
            allBooks = allBooks.equalTo('category', category).find();
        }

        allBooks.then(function(books) {
            templatesHelper.set('libraryBook', books, '.books-list');
        })
    }

    loadCategories(sammy) {
        pagesHelper.append('categories');

        var allBooks = bookModel.getBooks(),
            categories = [];

        allBooks.find()
            .then(function(books) {
                _.each(books, function(book) {
                    var hasThisCategory = _.find(categories, function(currentBook) {
                        return currentBook.category === book.attributes.category.capitalizeFirst();
                    });

                    if (!hasThisCategory) {
                        categories.push({
                            category: book.attributes.category.capitalizeFirst(),
                            picUrl: book.attributes.pictureURL
                        });
                    }
                });

                return templatesHelper.append('category', categories, '#categories-content');
            })
            .then(function() {
                var imageInCategory = $('.category-img');

                imageInCategory.on('click', function() {
                    var category = $(this).attr('data-category');

                    sammy.redirect('#/library/categories/' + category.toLowerCase());
                });
            });
    }

    detailed(sammy) {
        pagesHelper.append('libraryDetailed');
        var id = sammy.params['bookId'];

        var selectedBook = bookModel.getBooks().get(id, {
            success: function(result) {
                var bookViews = result.attributes.views;
                result.set('views', ++bookViews);
                bookModel.updateBook(result);

                templatesHelper.appendSingle('bookDetailed', result, '#library-content');

            },
            error: function(object, error) {
                console.log('Cannot access the given book' + object);
                console.log(error);
            }
        });
    }

    search(sammy) {
        pagesHelper.append('librarySearch');

        bookModel.getBooks().find()
            .then(function(allBooks) {
                var searchFilter = sammy.params['prop'];
                var searchTerm = sammy.params['search'];

                allBooks = handleSearchParameters(allBooks, searchFilter, searchTerm);

                $('#search-form button').on('click', changeFormActionAttribute);

                return displaySearchResults(allBooks, searchFilter, searchTerm);
            })
            .then(function() {
                var libraryBookContent = $('#library-content');
                libraryBookContent.on('click', 'div img', function() {
                    var id = $(this).attr('data-id');
                    sammy.redirect('#/library/detailed/' + id);
                });
            });
    }

    top(sammy) {
        pagesHelper.append('libraryTop');

        bookModel.getBooks().find()
            .then(function(allBooks) {
                var sortedBooks = _.chain(allBooks)
                    .sortBy(function(book) {
                        return book.attributes.views;
                    })
                    .reverse()
                    .value();

                return templatesHelper.append('libraryBook', sortedBooks, '#library-content');

            })
            .then(function() {
                var libraryBookContent = $('#library-content');
                libraryBookContent.on('click', 'div img', function() {
                    var id = $(this).attr('data-id');
                    sammy.redirect('#/library/detailed/' + id);
                });
            });
    }
}

function handleSearchParameters(initialBookCollection, searchFilter, searchTerm) {
    if (searchFilter && searchTerm) {
        let newBookCollection = searchModel.filterBy(initialBookCollection, searchFilter, searchTerm);
        return newBookCollection;
    }

    return initialBookCollection;
}

function changeFormActionAttribute() {
    var $searchForm = $(this).parent();
    var searchFilterValue = $searchForm.find('#search-filter :selected').val();
    var searchTermValue = $searchForm.find('#search-term').val();

    searchFilterValue = searchFilterValue || 'empty';
    searchTermValue = searchTermValue || 'empty';

    var searchParams = searchFilterValue + '/' + searchTermValue;
    $searchForm.attr('action', '#/library/search/' + searchParams);
}

function displaySearchResults(booksCollection, searchFilter, searchTerm) {
    if (booksCollection.length > 0) {
        return templatesHelper.append('libraryBook', booksCollection, '#library-content');
    } else {
        var emptySearch = {
            searchFilter: searchFilter.capitalizeFirst(),
            searchTerm: searchTerm
        };

        return templatesHelper.appendSingle('libraryEmptySearch', emptySearch, '#library-content');
    }
}

export default new libraryController;