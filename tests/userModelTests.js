import mocha from 'mocha'
import chai from 'chai';
import jsdom from 'jsdom';
import $ from 'jquery';
import jq from 'jquery';
import User from '../models/viewModels/userViewModel.js';

var expect = chai.expect;
var longName = 'Qwertyuiopasdfghj77klzxcvbnmkjhgfds';

beforeEach(function () {
    sessionStorage.clear();
});

describe('User tests', function () {
    describe('Valid tests', function () {
        it('expect session storage length to be 0 when user is valid', function () {
            var validUser = new User('John123', 'Asdf5PO69', 'Gosho', 'Goshev', 'a.morgan@yahoo.com');
            var expected = 0;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
        });

        describe('Invalid tests', function () {
            // test user name
            it('expect session storage length to be 1, when userName contains whitespace', function () {
                var invalidUserNameWithWhiteSpace = new User('Jo hn123', 'Asdf5PO69', 'Gosho', 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when userName is empty', function () {
                var invalidUserNameEmpty = new User('', 'Asdf5PO69', 'Gosho', 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when userName is shorter', function () {
                var invalidShortUserName = new User('John', 'Asdf5PO69', 'Gosho', 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when userName is longer', function () {
                var invalidUserName = new User(longName, 'Asdf5PO69', 'Gosho', 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            //test password
            it('expect session storage length to be 1, when password contain restricted symbols', function () {
                var passwordWithRestrictedSymbols = new User('John123', '<Asdf5PO69', 'Gosho', 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when password is shorter', function () {
                var invalidShortPassword = new User('John123', 'AO69', 'Gosho', 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when password is longer', function () {
                var invalidLongPassword = new User('John123',longName, 'Gosho', 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            //test First Name
            it('expect session storage length to be 1, when first name contains digits', function () {
                var invalidFirstNameWithDigit = new User('John123', 'Asdf5PO69', 'Go7sho', 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when firstName is empty', function () {
                var invalidFirstNameEmpty = new User('John123', 'Asdf5PO69', '', 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when firstName contain restricted symbols', function () {
                var firstNameWithRestrictedSymbols = new User('John123', 'Asdf5PO69', 'Gosho>', 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when firstName is shorter', function () {
                var invalidShortFirstName = new User('John123', 'Asdf5PO69', 'o', 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when firstName is longer', function () {
                var invalidFirstName = new User('John123', 'Asdf5PO69', longName, 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            // test last name
            it('expect session storage length to be 1, when last name contains digits', function () {
                var invalidLastNameWithDigit = new User('John123', 'Asdf5PO69', 'Gosho', '3Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when lastName is empty', function () {
                var invalidLastNameEmpty = new User('John123', 'Asdf5PO69', 'Gosh0', '', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when lastName contain restricted symbols', function () {
                var lastNameWithRestrictedSymbols = new User('John123', 'Asdf5PO69', 'Gosho', 'Go$shev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when lastName is shorter', function () {
                var invalidShortLastName = new User('John123', 'Asdf5PO69', 'Gosho', 'G', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when lastName is longer', function () {
                var invalidLastName = new User('John123', 'Asdf5PO69', 'Gosho', longName, 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when email is empty', function () {
                var invalidLastNameEmpty = new User('John123', 'Asdf5PO69', '', 'Goshev', 'a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            // test email
            it('expect session storage length to be 1, when email contain restricted symbols', function () {
                var emailWithRestrictedSymbols = new User('John123', 'Asdf5PO69', 'Gosho', 'Goshev', '<a.morgan@yahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when missing @', function () {
                var invalidEmailMissingEt = new User('John123', 'Asdf5PO69', 'Gosho', 'Goshev', 'a.morganyahoo.com');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when missing dot after et', function () {
                var invalidEmailWithoutDot = new User('John123', 'Asdf5PO69', 'Gosho', 'Goshev', 'a.morgan@yahoocom');
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });
        });
    });
});