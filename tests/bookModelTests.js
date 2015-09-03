import mocha from 'mocha'
//import mocha.css from 'mocha'
import chai from 'chai';
/*import jsdom from 'jsdom';
 import $ from 'jquery';
 import jq from 'jquery';*/
import Book from './models/viewModels/bookViewModel.js';
//import bookModel from'../models/bookModel.js';


mocha.setup('bdd');

var expect = chai.expect;

//var result = require('../tasks/task-1')();

var longName = 'Qwertyuiopasdfghjklzxcvbnmkjhgfds';


describe('Book tests', function () {
    describe('Valid tests', function () {

        sessionStorage.clear();
        it('expect addBook to exist when valid data with ISBN 10 symbols long , and session storage length to be 0', function () {
            var validBook10 = new Book('It', 'Stephan King', 'Horror', '1234567890', '12', 'pictureURL', 'Nice book');
            validBook10.add();
            var expected = 0;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();

        });

        it('expect getBook to exist when valid data with ISBN 13 symbols long, and session storage length to be 0', function () {
            var validBook13 = new Book('It', 'Stephan King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            validBook13.add();
            var expected = 0;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

    });

    describe('Invalid tests', function () {
        it('expect session storage length to be 1, when title is not valid', function () {
            var invalidBookTitle = new Book('<post', 'Stephan King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            invalidBookTitle.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when title is empty', function () {
            var invalidBookTitleEmptyString = new Book('', 'Stephan King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            invalidBookTitleEmptyString.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when author is not valid', function () {
            var invalidBookAuthor = new Book('It', 'Step<han King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            invalidBookAuthor.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when author is empty', function () {
            var invalidBookAuthorEmptyString = new Book('It', 'Step<han King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            invalidBookAuthorEmptyString.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        })

        it('expect session storage length to be 1, when category name is not valid', function () {
            var invalidBookCategoryName = new Book('It', 'Stephan King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            invalidBookCategoryName.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when category is empty', function () {
            var invalidBookCategoryEmptyString = new Book('It', 'Stephan King', '', '1234567890123', '12', 'pictureURL', 'Nice book');
            invalidBookCategoryEmptyString.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when category length is longer', function () {
            var invalidBookCategoryLong = new Book('It', 'Stephan King', longName, '1234567890123', '12', 'pictureURL', 'Nice book');
            invalidBookCategoryLong.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when ISBN length is longer', function () {
            var invalidBookLongIsbn = new Book('It', 'Stephan King', longName, '12345678901234', '12', 'pictureURL', 'Nice book');
            invalidBookLongIsbn.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when ISBN length is shorter', function () {
            var invalidBookShortIsbn = new Book('It', 'Stephan King', 'Horror', '123456789', '12', 'pictureURL', 'Nice book');
            invalidBookShortIsbn.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when ISBN length is 11', function () {
            var invalidBookIsbn11 = new Book('It', 'Stephan King', 'Horror', '123456789101', '12', 'pictureURL', 'Nice book');
            invalidBookIsbn11.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when price is NAN ', function () {
            var invalidPrice = new Book('It', 'Stephan King', 'Horror', '1234567890123', '1a2', 'pictureURL', 'Nice book');
            invalidPrice.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when price is negative number', function () {
            var invalidNegativePrice = new Book('It', 'Stephan King', 'Horror', '1234567890123', '-12', 'pictureURL', 'Nice book');
            invalidNegativePrice.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when title is not valid', function () {
            var invalidBookTitle = new Book('<post', 'Stephan King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            invalidBookTitle.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when title is empty', function () {
            var invalidBookTitleEmptyString = new Book('', 'Stephan King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            invalidBookTitleEmptyString.add();
            var expected = 1;
            var actual = sessionStorage.length
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });
    });
});



