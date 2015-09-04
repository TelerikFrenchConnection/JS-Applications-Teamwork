import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import bookModel from '../models/bookModel.js';

class homeController {
    load(sammy) {
        pagesHelper.append('home');
        bookModel.getBooks()
            .descending("createdAt")
            .limit(3)
            .find()
            .then(function(books){
                return templatesHelper.append('libraryBook', books, '#library-content');
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

export default new homeController();