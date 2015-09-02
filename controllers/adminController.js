import _ from 'underscore';
import db from 'dbContext';

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
    } else if (!Parse.User.current().attributes.isAdmin) {
        sammy.redirect('#/404');
    }
}

export default new adminController;