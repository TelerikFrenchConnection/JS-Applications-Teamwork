import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import bookModel from '../models/bookModel.js';


class adminController {
	load(sammy) {
        if(isUserAuthorized(sammy)){
            pagesHelper.append('admin');
            // show all contact form entires
        }
	}

	addBook(sammy) {
        isUserAuthorized(sammy);
		pagesHelper.appendTo('adminAddbook', '#admin-forms-container');
        if(isUserAuthorized(sammy)){
            pagesHelper.appendTo('adminAddbook', '#admin-forms-container');
        }
	}
    addBookPost(sammy) {
        var title = sammy.params['book-title'];
        var author = sammy.params['book-author'];
        var category = sammy.params['book-category'];
        var isbn = sammy.params['book-isbn'];
        var price = sammy.params['book-price'];
        var pictureURL = sammy.params['book-image-url'];
        var description = sammy.params['book-description'];

        bookModel.addBook(title, author, category, isbn, price, pictureURL, description)
            .then(function(book){
                console.log('Success at adding new book entry');
            }, function(book) {
                console.log('Failed at adding new book entry');
            });
    }
    removeBook(sammy) {
        isUserAuthorized(sammy);
        pagesHelper.appendTo('adminRemovebook', '#admin-forms-container');
        if(isUserAuthorized(sammy)){
            pagesHelper.appendTo('adminRemovebook', '#admin-forms-container');
        }
    }
    removeBookPost(sammy) {
        var isbnParam = sammy.params['isbn'];

        bookModel.getBooks().find()
            .then(function(allBooks) {
                allBooks.forEach(function(book){
                    if (book.attributes.isbn === isbnParam) {
                        bookModel.removeBook(book);
                    }
                });
            });    
    }

}

function isUserAuthorized(sammy) {
    if(!Parse.User.current()) {
        sammy.redirect('#/404');
        return false;
    } else if (!Parse.User.current().attributes.isAdmin) {
        sammy.redirect('#/404');
        return false;
    } else {
        return true;
    }
}

export default new adminController;