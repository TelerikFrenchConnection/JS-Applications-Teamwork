import $ from 'jquery';
import sammy from 'sammy';

import './extentions/storageExtentions.js';

import homeController from './controllers/homeController.js';
import libraryController from './controllers/libraryController.js';
import contactController from './controllers/contactController.js';
import accountController from './controllers/accountController.js';
import adminController from './controllers/adminController.js';
import notFoundController from './controllers/adminController.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import headerHelper from './views/helpers/headerHelper.js';

export function init(element) {



	var app = Sammy(element, function () {

        this.before({}, function () {
            headerHelper.updateHeader();
        });

            /* this.notFound({}, function(verb, path) {
             path='#/404';
             var ret = this.error  ( this.redirect(path));
             return (verb === 'get') ? ret : true;
             });*/

          /*  notFound: function(verb, path) {
                    var ret = this.error(['404 Not Found', verb, path].join(' '));
                    return (verb === 'get') ? ret : true;
            }*/

         /*   var app = $.sammy('#app', function() {
                    this.notFound = function(){
                            // do something
                    }
            });*/




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


        this.get('#/404', function() {
                pagesHelper.append('404');
        });
	});

	app.run('#/');
}

