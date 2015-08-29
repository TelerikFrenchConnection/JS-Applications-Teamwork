var Book = (function() {
    import validate from './helpers/validatorHelper.js';

    var Book = {
        init: function(title, author, category, isbn, price, pictureURL, description) {
            this.title = title;
            this.author = author;
            this.category = category;
            this.isbn = isbn;
            this.price = price;
            this.pictureURL = pictureURL;
            this.description = description;
            return this;
        },

        get title() {
            return this.title;
        },

        set title(newTitle) {
            validate.isString(newTitle, 'Title');
            this._title = newTitle;
        },

        get author() {
            return this.author;
        },

        set author(newAuthor) {
            validate.isString(newAuthor, 'Author');
            this._author = newAuthor;
        },

        get category() {
            return this.category;
        },

        set category(newCategory) {
            validate.isString(newCategory, 'Category');
            this._category = newCategory;
        },

        get isbn() {
            return this.isbn;
        },

        set isbn(newIsbn) {
            validate.positiveNumber(newIsbn, 'Isbn');
            this._isbn = newIsbn;
        },

        get price() {
            return this.price;
        },

        set price(newPrice) {
            validate.price(newPrice, 'Price');
            this._price = newPrice;
        },

        get pictureURL() {
            return this.pictureURL;
        },

        set pictureURL(newPictureUrl) {
            this._pictureUrl = newPictureUrl;
        },

        get description() {
            return this.description;
        },

        set description(newDescription) {
            validate.isString(newDescription, 'Description');
            this._description = newDescription;
        }

    };
    return Book;
}());