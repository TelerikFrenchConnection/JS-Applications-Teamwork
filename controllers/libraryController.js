import _ from 'underscore';
import db from 'dbContext';

// import OOP models for library page

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import Book from '../models/bookModel.js';

var libraryController = (function () {
    function load() {
        pagesHelper.append('library');

        db.data.get('Book', function (allBooks) {
            allBooks.forEach(function (currentBook) {
                templatesHelper.append('libraryBookTemplate', currentBook, '#library-content');
            });
        });
    }

    function categories() {

    }

    function detailed() {

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