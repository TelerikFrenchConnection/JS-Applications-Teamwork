import mocha from 'mocha'
import chai from 'chai';
import jsdom from 'jsdom';
import $ from 'jquery';
import jq from 'jquery';
import Book from '../models/viewModels/bookViewModel.js';

var expect = chai.expect;
var longName = 'Qwertyuiopasdfghjklzxcvbnmkjhgfds';

describe('Book tests', function () {
    describe('Valid tests', function () {
        sessionStorage.clear();
        it('expect session storage length to be 0 when valid data with ISBN is 10 symbols long ', function () {
            var validBook10 = new Book('It', 'Stephan King', 'Horror', '1234567890', '12', 'pictureURL', 'Nice book');

            var expected = 0;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();

        });

        it('expect session storage length to be 0 when valid data with ISBN is 13 symbols long', function () {
            var validBook13 = new Book('It', 'Stephan King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            var expected = 0;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });
    });

    describe('Invalid tests', function () {
        it('expect session storage length to be 1, when title is not valid', function () {
            var invalidBookTitle = new Book('<post', 'Stephan King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when title is empty', function () {
            var invalidBookTitleEmptyString = new Book('', 'Stephan King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when author is not valid', function () {
            var invalidBookAuthor = new Book('It', 'Step<han King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when author is empty', function () {
            var invalidBookAuthorEmptyString = new Book('It', 'Step<han King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        })

        it('expect session storage length to be 1, when category name is not valid', function () {
            var invalidBookCategoryName = new Book('It', 'Stephan King', 'Horror', '1234567890123', '12', 'pictureURL', 'Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when category is empty', function () {
            var invalidBookCategoryEmptyString = new Book('It', 'Stephan King', '', '1234567890123', '12', 'pictureURL', 'Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when category length is longer', function () {
            var invalidBookCategoryLong = new Book('It', 'Stephan King', longName, '1234567890123', '12', 'pictureURL', 'Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when ISBN length is longer', function () {
            var invalidBookLongIsbn = new Book('It', 'Stephan King', longName, '12345678901234', '12', 'pictureURL', 'Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when ISBN length is shorter', function () {
            var invalidBookShortIsbn = new Book('It', 'Stephan King', 'Horror', '123456789', '12', 'pictureURL', 'Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when ISBN length is 11', function () {
            var invalidBookIsbn11 = new Book('It', 'Stephan King', 'Horror', '123456789101', '12', 'pictureURL', 'Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when price is NAN ', function () {
            var invalidPrice = new Book('It', 'Stephan King', 'Horror', '1234567890123', '1a2', 'pictureURL', 'Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when price is negative number', function () {
            var invalidNegativePrice = new Book('It', 'Stephan King', 'Horror', '1234567890123', '-12', 'pictureURL', 'Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when title is not valid', function () {
            var invalidBookDescription = new Book('<post', 'Stephan King', 'Horror', '1234567890123', '12', 'pictureURL', '#Nice book');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });

        it('expect session storage length to be 1, when title is empty', function () {
            var invalidBookDescriptionEmptyString = new Book('', 'Stephan King', 'Horror', '1234567890123', '12', 'pictureURL', '');
            var expected = 1;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
            sessionStorage.clear();
        });
    });
});



