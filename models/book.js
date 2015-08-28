var Book = (function() {
    var Book = {
        init: function(title, author, category, isbn, state, pictureURL, description) {
            this.title = title;
            this.author = author;
            this.category = category;
            this.isbn = isbn;
            this.state = state;
            this.pictureURL = pictureURL;
            this.description = description;
            return this;
        }
    };
    return Book;
}());