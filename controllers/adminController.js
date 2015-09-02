import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

class adminController {
	load(sammy) {
        if(isUserAuthorized(sammy)){
            pagesHelper.append('admin');
            // show all contact form entires
        }
	}

	addBook(sammy) {
        if(isUserAuthorized(sammy)){
            pagesHelper.appendTo('adminAddbook', '#admin-forms-container');
        }
	}
}

function isUserAuthorized(sammy) {
    if(!Parse.User.current()) {
        sammy.redirect('#/404');
        return false;
    } else if (!Parse.User.current().attributes.isAdmin) {
        sammy.redirect('#/404');
        return false;
    } else {
        return true;
    }
}

export default new adminController;