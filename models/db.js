import 'jquery';
import 'parse';

Parse.initialize("QNCJAvVfAkxaHeSdMr0aB2rgIZrtn56qkeWavnKu", "7c8uGlEb0QURsxyTFyYgTKS7br4sb9cj4jpCTVcb");

function addData(dataClass, dataObject) {
    var DataClass = Parse.Object.extend(dataClass);
    var data = new DataClass();
    data.save(dataObject);
}

function getData() {

}

export default {
    addData,
    getData
}

/*
### Testing different data structures ###

var books = (function(){
    var Book = Parse.Object.extend('Book');

    return books = {
        create: function(someParams) {
            var testBook = new Book();
            testBook.set('title', 'Book of tests');
            testBook.set('category', 'horror');
            //testBook.save() - saves to server, don't uncomment, spam hurts ;(
        },
        get: function(id) {

        }
    };
})();

var accounts = (function(){
    var Account = Parse.Object.extend('Account');

    return accounts = {
        login: function(){},
        signup: function(){}
    };
})();

*/