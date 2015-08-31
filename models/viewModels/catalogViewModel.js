var Catalog = (function(){
    var bookCatalog = [];
    var Catalog = {
        init: function(name) {
            this.name = name;
            this.bookCatalog = [];
            return this;
        },
        addBook: function (Book) {
            this.bookCatalog.push(Book);
            return this.bookCatalog.slice();
        },
        GetRandomBook: function() {
            var currentBook = this.bookCatalog[Math.floor(Math.random() * this.bookCatalog.length)];
            return currentBook;
        },
        removeBook: function(currentBook) {
            var currentIndex;

            this.bookCatalog.some(function (item, index) {
                currentIndex = index;
                return currentBook.title === item.title && currentBook.author === item.author;
            });

            if (currentIndex > -1) {
                this.bookCatalog.splice(currentIndex, 1);
            }

            return this.bookCatalog.slice();
        }

    };
    return Catalog;
}());
