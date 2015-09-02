import chai from 'chai';
import jsdom from 'jsdom';
import $ from 'jquery';
import jq from 'jquery';
import bookViewModel from '../models/bookModel.js';

//var result = require('../tasks/task-1')();

var utils = (function () {
    var CONSTS = {
        NAME: {
            MIN: 2,
            MAX: 40
        },
        DESCRIPTION: {
            MIN: 1,
            MAX: 1000
        },
        ISBN10: {
            LENGTH: 10
        },
        ISBN13: {
            LENGTH: 13
        },
        GENRE: {
            MIN: 2,
            MAX: 20
        },
        DURATION: {
            MIN: 0,
            MAX: 10000
        },
        RATING: {
            MIN: 1,
            MAX: 5
        },
        CHARS: 'QWERTYUIOPASDFGHJKLZXCVBNM _.-?!,\'\":;',
        DIGIS: '0123456789'
    };

    function getRandom(min, max) {
        if (typeof (max) === 'undefined') {
            max = min;
            min = 0;
        }
        /* jshint ignore: start */
        return (Math.random() * (max - min) + min) | 0;
        /* jshint ignore: end */
    }

    function getRandomString(chars, length) {
        return Array.apply(null, {
            length: length
        }).map(function () {
            return chars[getRandom(chars.length)];
        }).join('');
    }

    var utils = {
        valid: {
            getName: function () {
                var length = getRandom(CONSTS.NAME.MIN, CONSTS.NAME.MAX);
                return getRandomString(CONSTS.CHARS, length);
            },
            getISBN10: function () {
                var length = 10;
                return getRandomString(CONSTS.DIGIS, length);
            },
            getISBN13: function () {
                var length = 13;
                return getRandomString(CONSTS.DIGIS, length);
            },
            getGenre: function () {
                var length = getRandom(CONSTS.GENRE.MIN, CONSTS.GENRE.MAX);
                return getRandomString(CONSTS.CHARS, length);
            },
            getDescription: function () {
                var length = getRandom(CONSTS.DESCRIPTION.MIN, CONSTS.DESCRIPTION.MAX);
                return getRandomString(CONSTS.CHARS, length);
            }
        },

        invalid: {
            getShorterName: function () {
                var length = getRandom(0, CONSTS.NAME.MIN - 1);
                return getRandomString(CONSTS.CHARS, length);
            },
            getLongerName: function () {
                var length = getRandom(CONSTS.NAME.MAX + 1, CONSTS.NAME.MAX * 2);
                return getRandomString(CONSTS.CHARS, length);
            },
            getInvalidISBN10WithLetters: function () {
                var isbn = utils.valid.getISBN10().split(''),
                    index = getRandom(isbn.length);
                isbn.splice(index, 1, 'a');
                return isbn;
            },
            getInvalidISBN13WithLetters: function () {
                return utils.valid.getISBN13().substring(1);
            },
            getInvalidISBNNot10or13: function () {
                var isbn = utils.valid.getISBN13().split(''),
                    index = getRandom(isbn.length);
                isbn.splice(index, 1, 'a');
                return isbn;
            },
            getShorterDescription: function () {
                var length = getRandom(0, CONSTS.DESCRIPTION.MIN - 1);
                return getRandomString(CONSTS.CHARS, length);
            },
            getLongerDescription: function () {
                var length = getRandom(CONSTS.DESCRIPTION.MAX + 1, CONSTS.DESCRIPTION.MAX * 2);
                return getRandomString(CONSTS.CHARS, length);
            },
            getShorterGenre: function () {
                var length = getRandom(0, CONSTS.GENRE.MIN - 1);
                return getRandomString(CONSTS.CHARS, length);
            },
            getLongerGenre: function () {
                var length = getRandom(CONSTS.GENRE.MAX + 1, CONSTS.GENRE.MAX * 2);
                return getRandomString(CONSTS.CHARS, length);
            }
        }
    };

    return utils;
}());

sessionStorage.clear();

describe('Task #1 Tests', function () {

    before(function (done) {
        sessionStorage.clear();
        /*jsdom.env({
            html: '',
            done: function (errors, window) {
                global.window = window;
                global.document = window.document;
                global.$ = jq(window);
                Object.keys(window)
                    .filter(function (prop) {
                        return prop.toLowerCase().indexOf('html') >= 0;
                    }).forEach(function (prop) {
                        global[prop] = window[prop];
                    });
                done();
            }
        });*/
    });

    it('expect to append a list with 5 LIs, when selector is valid and COUNT is 5', function () {
        var count = 5;
        document.body.innerHTML = '<div id="root"></div>';
        result('#root', count);

        var $list = $('#root .items-list');
        expect($list).to.exist;
        expect($list).to.have.length(1);
        var $items = $list.find('*');
        expect($items).to.have.length(count);

        $items.each(function (index, item) {
            var $item = $(item);
            expect($item.is('li')).to.be.true;
            expect($item.hasClass('list-item')).to.be.true;
            expect($item.html()).to.equal('List item #' + index);
        });
    });
}