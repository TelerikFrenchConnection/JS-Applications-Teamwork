import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import bookModel from '../models/bookModel.js';
import searchModel from '../models/searchModel.js';

class libraryController {
    load(sammy) {
        pagesHelper.append('library');

        var allBooksRetrieved = [];
        var categories = [];

        bookModel.getBooks().find()
            .then(function(allBooks) {
                allBooks.forEach(function(book){
                    if (categories.indexOf(book.attributes.category) < 0) {
                        categories.push(book.attributes.category);
                    }
                });

                templatesHelper.append('categoriesTemplate', categories, '#book-category');

                allBooksRetrieved = allBooks;
                return templatesHelper.append('libraryBook', allBooks, '#library-content');
            })
            .then(function() {
                var booksToAdd = [];

                $('#book-category').change(function() {
                    var optionSelected = $(this).find(':selected');
                    var category = optionSelected.attr('value');
                    var emptyCategory = {category: category};

                    $(this).parent().nextAll().remove();

                    allBooksRetrieved.forEach(function(book) {
                        if (book.attributes.category === category) {
                            booksToAdd.push(book);
                        }

                    });

                    if (booksToAdd.length) {
                        templatesHelper.append('libraryBook', booksToAdd, '#library-content');
                    }
                    else {
                        templatesHelper.appendSingle('libraryEmptyCategory', emptyCategory, '#library-content');
                    }
                    

                    booksToAdd = [];
                });
            })
            .then(function() {
                var libraryBookContent = $('#library-content');
                libraryBookContent.on('click', 'div img', function() {
                    var id = $(this).attr('data-id');
                    sammy.redirect('#/library/detailed/' + id);
                });
            });
    }

    detailed(sammy) {
        pagesHelper.append('libraryDetailed');
        var id = sammy.params['bookId'];

        var selectedBook = bookModel.getBooks().get(id, {
            success: function(result) {
                templatesHelper.append('bookDetailed', [result], '#library-content');
            },
            error: function(object, error) {
                console.log('Cannot access the given book' + object);
                console.log(error);
            }
        });
    }

    search(sammy) {
        pagesHelper.append('librarySearch');

        // TODO: Extract common functions from promises?
        bookModel.getBooks().find()
            .then(function(allBooks) {
                var newBooksCollection = [];
                var searchFilter = sammy.params['prop'];
                var searchTerm = sammy.params['search'];

                if (searchFilter && searchTerm) {
                    newBooksCollection = searchModel.filterBy(allBooks, searchFilter, searchTerm);
                }
                else {
                    newBooksCollection = allBooks;
                }

                $('#search-form button').on('click', function() {
                    var $searchForm = $(this).parent();
                    var searchFilterValue = $searchForm.find('#search-filter :selected').val();
                    var searchTermValue = $searchForm.find('#search-term').val();

                    searchFilterValue = searchFilterValue || 'empty';
                    searchTermValue = searchTermValue || 'empty';
                    
                    var searchParams = searchFilterValue + '/' + searchTermValue;
                    $searchForm.attr('action', '#/library/search/' + searchParams);
                });

                if (newBooksCollection.length > 0) {
                    return templatesHelper.append('libraryBook', newBooksCollection, '#library-content');
                }
                else {
                    var emptySearch = {
                        searchFilter: searchFilter.capitalizeFirst(),
                        searchTerm: searchTerm
                    };

                    return templatesHelper.appendSingle('libraryEmptySearch', emptySearch, '#library-content');
                }
            })
            .then(function() {
                var libraryBookContent = $('#library-content');
                libraryBookContent.on('click', 'div img', function() {
                    var id = $(this).attr('data-id');
                    sammy.redirect('#/library/detailed/' + id);
                });
            });
    }

    top() {

    }
}

export default new libraryController;