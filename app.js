import $ from 'jquery';
import sammy from 'sammy';

import './extentions/storageExtentions.js';

import homeController from './controllers/homeController.js';
import libraryController from './controllers/libraryController.js';
import contactController from './controllers/contactController.js';
import accountController from './controllers/accountController.js';
import adminController from './controllers/adminController.js';

import headerHelper from './views/helpers/headerHelper.js';

export function init(element) {
	var app = Sammy(element, function () {

        this.before({}, function () {
            if (Parse.User.current()) {
                headerHelper.loginChangeHeader();
            } else {
                headerHelper.logoutChangeHeader();
            }

            $(element).html('');
        });

		this.get('#/', function() { this.redirect('#/home')});
		this.get('#/home', homeController.load);
        this.get('#/contact', contactController.load);

		this.get('#/library', libraryController.load);
		this.get('#/library/detailed/:bookId', libraryController.detailed);
        this.get('#/library/categories', libraryController.categories);
        this.get('#/library/search', libraryController.search);        
        this.get('#/library/search/:prop/:search', libraryController.search);
        this.get('#/library/top', libraryController.top);

        this.get('#/account', accountController.load);
		this.get('#/account/login', accountController.login);
		this.get('#/account/signup', accountController.signup);
        this.get('#/account/logout', accountController.logout);

        this.get('#/admin', adminController.load);
        this.get('#/admin/addbook', adminController.addBook);

        this.post('#/account/login', accountController.loginPost);
        this.post('#/account/signup', accountController.signupPost);

        this.get(/.*/, function() {
            // load 404 Page
        });
	});

	app.run('#/');
}