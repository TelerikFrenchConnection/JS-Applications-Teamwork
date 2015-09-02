import db from './database/dbContext.js';
import Book from './viewModels/bookViewModel.js';

class bookModel {
    addBook(title, author, category, isbn, price, pictureURL, description) {
        var book = new Book(title, author, category, isbn, +price, pictureURL, description);

        // Add error handling logic

        return db.add('Book', book);
    }

    getBooks() {
        return db.get('Book');
    }
}

export default new bookModel();
