import db from './database/dbContext.js';
import Book from './viewModels/bookViewModel.js';


class bookModel {
    addBook(title, author, category, isbn, price, pictureURL, description) {
        var book = new Book(title, author, category, isbn, +price, pictureURL, description);
        console.log(book);
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

    removeBookById(id) {
        this.getBooks().get(id, {
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
            },
            error: function(object, error) {
                console.log('Cannot access the given book' + object);
                console.log(error);
            }
        }); 
    }
}

export default new bookModel();
