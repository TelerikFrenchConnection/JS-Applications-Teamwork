import '../helpers/validatorHelper.js';

class Book {
    constructor(title, author, category, isbn, price, pictureURL, description) {
        this.titleProperty = title;
        this.authorProperty = author;
        this.categoryProperty = category;
        this.isbnProperty = isbn;
        this.priceProperty = price;
        this.pictureURLProperty = pictureURL;
        this.descriptionProperty = description;
        this.viewsProperty = 0;
        return this;
    }

    get titleProperty() {
        return this.title;
    }

    set titleProperty(newTitle) {
        validate.safeText(newTitle, 'title');
        this.title = newTitle;
    }

    get authorProperty() {
        return this.author;
    }

    set authorProperty(newAuthor) {
        validate.safeText(newAuthor, 'author');
        this.author = newAuthor;
    }

    get categoryProperty() {
        return this.category;
    }
    set categoryProperty(newCategory) {
        validate.safeText(newCategory, 'category');
        this.description = newCategory;
    }

    get isbnProperty() {
        return this.isbn;
    }

    set isbnProperty(newIsbn) {
        validate.ISBN(newIsbn, 'ISBN');
        this.isbn = newIsbn;
    }

    get priceProperty() {
        return this.price;
    }

    set priceProperty(newPrice) {
        validate.price(newPrice, 'price');
        this.price = newPrice;
    }

    get pictureURLProperty() {
        return this.pictureURL;
    }

    set pictureURLProperty(newPictureUrl) {
        validate.isEmpty(newPictureUrl, 'picture URL')
        this.pictureUrl = newPictureUrl;
    }

    get descriptionProperty() {
        return this.description;
    }

    set descriptionProperty(newDescription) {
        validate.safeText(newDescription, 'description');
        this.description = newDescription;
    }

    get viewsProperty() {
        return this.views;
    }

    set viewsProperty(newViewsCount) {
        this.views = newViewsCount;
    }
}

export default Book;