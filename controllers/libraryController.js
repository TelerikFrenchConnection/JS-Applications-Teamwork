import _ from 'underscore';
import db from 'dbContext';

import partialHelper from '../views/helpers/partialsHelper.js';
import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import Book from '../models/bookModel.js';

class libraryController {
    load() {
        var sammy = this;
        pagesHelper.append('library');

        db.data.get('Book', function(allBooks) {
            return templatesHelper.append('libraryBookTemplate', allBooks, '#library-content');
        }).then(function() {
            var libraryBookContent = $('#library-content div.inner img');
            libraryBookContent.on('click', function() {
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

    detailed() {
        pagesHelper.append('libraryDetailed');
        var id = this.params['bookId'];

        var selectedBook = db.data.getQuery('Book').get(id, {
            success: function(result) {
                templatesHelper.append('bookDetailedTemplate', [result], '#library-content');
            },
            error: function(object, error) {
                console.log('Cannot access the given book' + object);
                console.log(error);
            }
        });
    }

    search() {

    }

    top() {

    }
}

export default new libraryController;