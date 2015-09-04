import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import bookModel from '../models/bookModel.js';
import contactModel from '../models/contactModel.js';


class adminController {
    load(sammy) {
        if(isUserAuthorized(sammy)){
            pagesHelper.append('admin');

            contactModel.getContacts()
                .descending("createdAt")
                .find()
                .then(function(messages) {
                    _.each(messages, function(message){
                        let $tableRow = $('<tr/>');

                        console.log(message);
                        $tableRow.append($('<td/>').html(message.attributes.name));
                        $tableRow.append($('<td/>').html(message.attributes.email));
                        $tableRow.append($('<td/>').html(message.attributes.title));
                        $tableRow.append($('<td/>').html(message.attributes.text));

                        $('tbody').append($tableRow);
                    })
                })
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
                bookModel.removeBookById(idParam)
                    .then(function() {
                        sammy.redirect('#/admin');
                    }, function() {
                        appendRemoveError('ID');
                    });
            } else if (sammy.params['title']) {
                var titleParam = sammy.params['title'];
                bookModel.removeBookByTitle(titleParam)
                    .then(function() {
                        sammy.redirect('#/admin');
                    }, function() {
                        appendRemoveError('title');
                    });
            } else if (sammy.params['isbn']) {
                var isbnParam = sammy.params['isbn'];
                bookModel.removeBookByISBN(isbnParam)
                    .then(function() {
                        sammy.redirect('#/admin');
                    }, function() {
                        appendRemoveError('ISBN');
                    });
            }
        }
        
    }

    editBook(sammy) {
        if(isUserAuthorized(sammy)){
            pagesHelper.append('adminEditbook');
        }
    }

    getBookPost(sammy) {
        if(isUserAuthorized(sammy)){
            var id = sammy.params['id'];

            $('.edit-book-hidden').attr('value', id);

            bookModel.getBooks()
                .equalTo('objectId', id)
                .first().then(function(book) {
                    let bookAttrs = book.attributes;

                    $('input[name=title]').val(bookAttrs.title);
                    $('input[name=author]').val(bookAttrs.author);
                    $('input[name=category]').val(bookAttrs.category);
                    $('input[name=isbn]').val(bookAttrs.isbn);
                    $('input[name=price]').val(bookAttrs.price);
                    $('input[name=pictureURL]').val(bookAttrs.pictureURL);
                    $('input[name=bookURL]').val(bookAttrs.kindleURL);
                    $('input[name=description]').val(bookAttrs.description);
                });
        }
    }

    editBookPost(sammy) {
        var id = sammy.params['id'];

        bookModel.getBooks()
            .equalTo('objectId', id)
            .first().then(function(book) {
                book.set('title', sammy.params['title']);
                book.set('author', sammy.params['author']);
                book.set('category', sammy.params['category']);
                book.set('isbn', sammy.params['isbn']);
                book.set('price', +sammy.params['price']);
                book.set('pictureURL', sammy.params['pictureURL']);
                book.set('kindleURL', sammy.params['bookURL']);
                book.set('description', sammy.params['description']);

                console.log(book);
                book.save().then(function(){
                    sammy.redirect('#/admin');
                }, function(error){
                    console.log(error);
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

function appendRemoveError(name) {
    var errorObject = {name, message: "does not point to any existing book"};
    templatesHelper.setSingle('warning', errorObject, '.warning');
}

export default new adminController;