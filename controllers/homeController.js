import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

// import OOP models for home page

var homeController = (function () {
    function load() {
        pagesHelper.append('home');
    }

    function exampleBooks() {
        /* Commented so it doesn't spam the database on each refresh
         db.data.add('Book', {
         title: 'Configurating Parse backend',
         category: 'Horror'
         });*/

        db.data.get('Book', function (books) {
            books.forEach(function (book) {
                console.log(book.attributes['category']);
            })
        })
    }

    return load;
})();

export default {
    load: homeController
}