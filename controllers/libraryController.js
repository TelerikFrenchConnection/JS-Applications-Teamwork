import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import bookModel from '../models/bookModel.js';
import searchModel from '../models/searchModel.js';

class libraryController {
    load(sammy) {
        pagesHelper.append('library');

        bookModel.getBooks().find()
            .then(function(allBooks) {
                return templatesHelper.append('libraryBook', allBooks, '#library-content');
            })
            .then(function() {
                var libraryBookContent = $('#library-content');
                libraryBookContent.on('click', 'div img', function() {
                    var id = $(this).attr('data-id');
                    sammy.redirect('#/library/detailed/' + id);
                });
            });
    }

    categories(sammy) {
        var allBooksRetrieved = [];

        pagesHelper.append('libraryCategories')

        bookModel.getBooks().find()
            .then(function(allBooks) {
                allBooksRetrieved = allBooks;
                return templatesHelper.append('libraryBook', allBooks, '#library-content');
            })
            .then(function() {
                var booksToAdd = [];

                $('#book-category').change(function() {
                    var category = $(this).find(':selected').attr('value');

                    var emptyCategory = {category: category};

                    $(this).parent().nextAll().remove();

                    allBooksRetrieved.forEach(function(book) {
                        if (book.attributes.category === category) {
                            booksToAdd.push(book);
                        }

                    });

                    if (booksToAdd.length) {
                        templatesHelper.append('libraryBook', booksToAdd, '#library-content');   
                        console.log(booksToAdd); 
                    }
                    else {
                        templatesHelper.appendSingle('libraryEmptyCategory', emptyCategory, '#library-content'); 
                        console.log(emptyCategory);  
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
                    var searchInputValue = $searchForm.find('#search-term').val();
                    
                    var searchParams = searchFilterValue + '/' + searchInputValue;
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