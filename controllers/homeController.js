import _ from 'underscore';
import db from '../models/db.js';

// import OOP models for home page

var homeController = (function () {
    function load() {
        $.get('./views/home.html', function (result) {
            $('#content').append(result);
        });

        exampleBooks();
    }

    function exampleBooks() {
        /* Commented so it doesn't spam the database on each refresh
         db.data.add('Book', {
         title: 'Configurating Parse backend',
         category: 'Horror'
         });*/

        db.data.get('Book', function (books) {
            books.forEach(function (book) {
                console.log(book.get('title'));
            })
        })
    }

    return load;
})();

export default {
    load: homeController
}