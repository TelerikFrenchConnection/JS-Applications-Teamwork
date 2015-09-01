import _ from 'underscore';
import db from 'dbContext';

import partialHelper from '../views/helpers/partialsHelper.js';
import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

class adminController {
	load(sammy) {
        isUserAuthorized(sammy);

        // show all contact form entires
	}

	addBook(sammy) {
        isUserAuthorized(sammy);

		pagesHelper.append('adminAddbook');
	}

}

function isUserAuthorized(sammy) {
    if(!Parse.User.current()) {
        sammy.redirect('#/404');
    }
}

export default new adminController;