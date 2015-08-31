import _ from 'underscore';
import db from 'dbContext';

import partialHelper from '../views/helpers/partialsHelper.js';
import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

class homeController {
    load() {
        pagesHelper.append('home');
    }

    exampleBooks() {
        /*
         db.data.add('Book', {
         title: 'Configurating Parse backend',
         category: 'Horror'
         });

        db.data.get('Book', function (books) {
            books.forEach(function (book) {
                console.log(book.attributes['category']);
            })
        })
        */
    }
}

export default new homeController();