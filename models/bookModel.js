import db from './database/dbContext.js';
import Book from './viewModels/bookViewModel.js';

import errorHelper from './helpers/errorHelper.js';

class bookModel {
    addBook(title, author, category, isbn, price, pictureURL, kindleURL, description) {
        var book = new Book(title, author, category, isbn, +price, pictureURL, kindleURL, description);

        var promise = new Promise(function (resolve, reject) {
            var errors = errorHelper.getErrors();

            if (errors.length === 0) {
                db.add('Book', book);
                resolve();
            } else {
                reject(errors);
            }

            errors = [];
        });

        return promise;
    }

    getBooks() {
        return db.get('Book');
    }

    updateBook(book) {
        book.save(null, {
            success: function (bookObject) {
                bookObject.save();
            },
            error: function (bookObject, error) {
                console.log('Cannot access the given book' + object);
                console.log(error);
            }
        });
    }

    getBookById(id) {
        var that = this;
        return new Promise(function(resolve, reject) {
            that.getBooks().get(id, {
                success: function(book) {
                    resolve(book);
                },
                error: function(book, error) {
                    reject(error);
                }
            });
        });
    }

    getBooksBy(prop, value) {
        var that = this;
        return new Promise(function(resolve, reject) {
            that.getBooks()
                .equalTo(prop, value)
                .find({
                    success: function(books) {
                        if (books.length < 1) {
                            reject({
                                message: 'Could not retrieve any books from "' + prop + '" with "' + value + '"'
                            });
                        }

                        resolve(books);
                    }
                });
        });
    }

    removeBookById(id) {
        return this.getBooks().get(id, {
            success: function(receivedBook) {
                receivedBook.destroy({
                  success: function(myObject) {
                    console.log('Book deleted successfully!');
                    // The object was deleted from the Parse Cloud.
                  },
                  error: function(myObject, error) {
                    console.log('Error at book destroying!');
                    // The delete failed.
                    // error is a Parse.Error with an error code and message.
                  }
                });
            }
        }); 
    }

    removeBooksBy(prop, value) {
        var that = this;
        return new Promise(function(resolve, reject) {
            that.getBooks()
                .equalTo(prop, value)
                .find()
                .then(function(booksToRemove) {
                    if (booksToRemove.length < 1) {
                        reject({
                            message: 'No books to remove from "' + prop + '" with "' + value + '"'
                        });
                    }

                    var promise = Parse.Promise.as();
                    booksToRemove.forEach(function(book) {
                        promise = promise.then(function() {
                            return book.destroy();
                        });
                    });

                    resolve(booksToRemove);
                });
        });
    }
}

export default new bookModel();
