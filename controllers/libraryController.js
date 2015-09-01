import _ from 'underscore';
import db from 'dbContext';

import partialHelper from '../views/helpers/partialsHelper.js';
import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import bookModel from '../models/bookModel.js';

class libraryController {
    load(sammy) {
        pagesHelper.append('library');

        bookModel.getBooks().find()
            .then(function(allBooks) {
                return templatesHelper.append('libraryBookTemplate', allBooks, '#library-content');
            })
            .then(function() {
                var libraryBookContent = $('#library-content');
                libraryBookContent.on('click', 'div.inner img', function() {
                    var id = $(this).attr('data-id');
                    sammy.redirect('#/library/detailed/' + id);
                });
            });
    }

    categories() {
        var allBooksRetrieved = [];

        pagesHelper.append('libraryCategories')

        db.data.get('Book', function(allBooks) {
            allBooksRetrieved = allBooks;
            return templatesHelper.append('libraryBookTemplate', allBooks, '#library-content');
        }).then(function() {
            var booksToAdd = [];

            $('#book-category').change(function() {
                var category = $(this).find(':selected').attr('value');

                $(this).parent().nextAll().remove();

                allBooksRetrieved.forEach(function(book) {
                    if (book.attributes.category === category) {
                        booksToAdd.push(book);
                    }

                });

                templatesHelper.append('libraryBookTemplate', booksToAdd, '#library-content');

                booksToAdd = [];
            });
        });
    }

    detailed(sammy) {
        pagesHelper.append('libraryDetailed');
        var id = sammy.params['bookId'];

        var selectedBook = bookModel.getBooks().get(id, {
            success: function(result) {
                templatesHelper.append('bookDetailedTemplate', [result], '#library-content');
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
                return templatesHelper.append('libraryBookTemplate', allBooks, '#library-content');
            })
            .then(function() {
                var libraryBookContent = $('#library-content');
                libraryBookContent.on('click', 'div.inner img', function() {
                    var id = $(this).attr('data-id');
                    sammy.redirect('#/library/detailed/' + id);
                });
            });
    }

    top() {

    }
}

export default new libraryController;