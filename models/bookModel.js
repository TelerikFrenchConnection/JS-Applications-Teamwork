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
                resolve()
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

    getBookBy(prop) {
        var that = this;
        return new Promise(function(resolve, reject) {
            that.getBooks().get(prop, {
                success: function(book) {
                    resolve(book);
                },
                error: function(book, error) {
                    reject(error);
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

    removeBookByTitle(title) {
        return this.getBooks().get(title, {
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

    removeBookByISBN(isbn) {
        return this.getBooks().get(isbn, {
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
}

export default new bookModel();
