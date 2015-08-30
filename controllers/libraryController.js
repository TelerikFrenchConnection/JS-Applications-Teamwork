import _ from 'underscore';
import db from 'dbContext';

// import OOP models for library page

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import Book from '../models/bookModel.js';

var libraryController = (function() {
    function load() {        
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

    function categories() {

    }

    function detailed() {
        pagesHelper.append('libraryDetailed');
        var id = this.params['bookId'];
        console.log(id);

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

    function search() {

    }

    function top() {

    }

    return {
        load,
        categories,
        detailed,
        search,
        top
    };
})();

export default libraryController;