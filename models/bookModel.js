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

     return promise

    }

    getBooks() {
        return db.get('Book');
    }

    removeBook(book) {
        return db.remove('Book', book);
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
}

export default new bookModel();
