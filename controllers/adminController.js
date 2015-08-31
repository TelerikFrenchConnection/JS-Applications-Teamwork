import _ from 'underscore';
import db from 'dbContext';

import partialHelper from '../views/helpers/partialsHelper.js';
import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

class adminController {
	load() {

	}

	addBook() {
		pagesHelper.append('adminAddbook');
	}

}

export default new adminController;