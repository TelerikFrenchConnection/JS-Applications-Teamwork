import mocha from 'mocha'
import chai from 'chai';
import jsdom from 'jsdom';
import $ from 'jquery';
import jq from 'jquery';
import Contact from '../models/viewModels/contactViewModel.js';

var expect = chai.expect,
    validContact = new Contact({
        email: 'a.morgan@yahoo.com',
        name: 'John Smith',
        title: 'About new comics',
        text: 'When expexted to add new more comics'
    }),

    invalidContactData = {
        emailWithoutEt: 'a.morganyahoo.com',
        emailWithoutDotafterAt: 'a.morgan@yahoocom',
        nameWithRestrictedSymbols: 'Jo(hn',
        shortName: 'l',
        longName: 'Qwertyuiopasdfghjklzxcvbnmkjhgfds',
        titleWithRestrictedSymbols: '$ew comics',
        textWithRestrictedSymbols: 'When <expexted to add new more comics',
        emptyString:''
    };

beforeEach(function () {
    sessionStorage.clear();
});

describe('Contact tests', function () {
    describe('Valid tests', function () {
        it('expect session storage length to be 0 when contact is valid', function () {
            var currentContact=validContact;
            var expected = 0;
            var actual = sessionStorage.length;
            expect(actual).to.equal.(expected);
        });

        describe('Invalid tests', function () {

            it('expect session storage length to be 1, when email is without @', function () {
                var contactEmailWithoutEt = new Contact(
                    invalidContactData.emailWithoutEt,
                    validContact.name,
                    validContact.title,
                    validContact.text
                );
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when email is without dot after @', function () {
                var contactEmailWithoutDot = new Contact(
                    invalidContactData.emailWithoutDotafterAt,
                    validContact.name,
                    validContact.title,
                    validContact.text
                );
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when email is empty', function () {
                var contactEmptyEmail = new Contact(
                    invalidContactData.emptyString,
                    validContact.name,
                    validContact.title,
                    validContact.text
                );
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when name contain restricted symbols', function () {
                var contactNameWithRectrictedSymbols = new Contact(
                    validContact.email,
                    invalidContactData.nameWithRestrictedSymbols,
                    validContact.title,
                    validContact.text
                );
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when firstName is shorter', function () {
                var contactShortFirstName = new Contact(
                    validContact.email,
                    invalidContactData.shortName,
                    validContact.title,
                    validContact.text
                );
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when firstName is longer', function () {
                var invalidFirstName = new Contact(
                    validContact.email,
                    invalidContactData.longName,
                    validContact.title,
                    validContact.text
                );
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when title is not valid', function () {
                var contactTitleWithRestrictedSymbol =  new Contact(
                    validContact.email,
                    validContact.name,
                    invalidContactData.titleWithRestrictedSymbols,
                    validContact.text
                );
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when title is empty', function () {
                var contactTitleEmpty
                new Contact(
                    validContact.email,
                    validContact.name,
                    invalidContactData.emptyString,
                    validContact.text
                );
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });

            it('expect session storage length to be 1, when title is not valid', function () {
                var contactTitleWithRestrictedSymbol =  new Contact(
                    validContact.email,
                    validContact.name,
                    validContact.title,
                    invalidContactData.textWithRestrictedSymbols
                );
                var expected = 1;
                var actual = sessionStorage.length;
                expect(actual).to.equal.(expected);
            });
        });
    });
});