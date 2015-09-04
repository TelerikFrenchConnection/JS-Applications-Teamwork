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
        if(isUserAuthorized(sammy)){
            pagesHelper.append('adminAddbook');
        }
	}

    addBookPost(sammy) {
        var title = sammy.params['title'];
        var author = sammy.params['author'];
        var category = sammy.params['category'];
        var isbn = sammy.params['isbn'];
        var price = sammy.params['price'];
        var pictureURL = sammy.params['pictureURL'];
        var kindleURL = sammy.params['bookURL'];
        var description = sammy.params['description'];

        bookModel.addBook(title, author, category, isbn, price, pictureURL, kindleURL, description)
            .then(function(){
                sammy.redirect('#/admin');
            }, function(errors) {
                templatesHelper.set('warning', errors, '.warning');
            });

    }
    removeBook(sammy) {
        if(isUserAuthorized(sammy)){
            pagesHelper.append('adminRemovebook');
        }
    }
    removeBookPost(sammy) {
        if(isUserAuthorized(sammy)){
            if (sammy.params['id']) {
                var idParam = sammy.params['id'];
                bookModel.removeBookById(idParam);  
            } else if (sammy.params['title']) {
                var titleParam = sammy.params['title'];
                bookModel.removeBookByTitle(titleParam);  
            } else if (sammy.params['isbn']) {
                var isbnParam = sammy.params['isbn'];
                bookModel.removeBookByISBN(isbnParam);  
            }         
        }
        
    }

    editBook(sammy) {
        if(isUserAuthorized(sammy)){
            pagesHelper.append('adminEditbook');
        }
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