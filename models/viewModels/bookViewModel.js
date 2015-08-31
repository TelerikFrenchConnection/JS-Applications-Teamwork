import '../helpers/validatorHelper.js';

class Book {
    constructor(title, author, category, isbn, price, pictureURL, description) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.isbn = isbn;
        this.price = price;
        this.pictureURL = pictureURL;
        this.description = description;
        return this;
    }

    get titleProperty() {
        return this.title;
    }

    set titleProperty(newTitle) {
        validate.isString(newTitle, 'Title');
        this.title = newTitle;
    }

    get authorProperty() {
        return this.author;
    }

    set authorProperty(newAuthor) {
        validate.isString(newAuthor, 'Author');
        this.author = newAuthor;
    }

    get categoryProperty() {
        return this.category;
    }

    set categoryProperty(newCategory) {
        validate.isString(newCategory, 'Category');
        this.category = newCategory;
    }

    get isbnProperty() {
        return this.isbn;
    }

    set isbnProperty(newIsbn) {
        validate.isString(newIsbn, 'Isbn');
        this.isbn = newIsbn;
    }

    get priceProperty() {
        return this.price;
    }

    set priceProperty(newPrice) {
        validate.price(newPrice, 'Price');
        this.price = newPrice;
    }

    get pictureURLProperty() {
        return this.pictureURL;
    }

    set pictureURLProperty(newPictureUrl) {
        this.pictureUrl = newPictureUrl;
    }

    get descriptionProperty() {
        return this.description;
    }

    set descriptionProperty(newDescription) {
        validate.isString(newDescription, 'Description');
        this.description = newDescription;
    }
}

export default Book;