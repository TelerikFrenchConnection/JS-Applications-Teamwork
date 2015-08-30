import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

var adminController = (function () {
	function load() {

	}

	function addBook() {
		pagesHelper.append('adminAddbook');
	}

	return {
		load,
		addBook
	};
}());

export default adminController;