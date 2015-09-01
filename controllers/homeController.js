import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

class homeController {
    load() {
        pagesHelper.append('home');
    }
}

export default new homeController();