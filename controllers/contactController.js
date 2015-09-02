import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import contactModel from '../models/contactModel.js';

class contactsController {
    load() {
        pagesHelper.append('contact');
        //var model = new Contact('d.dragoeva@abv.bg', 'Dushka', 'Java Script','Checkboxes are for selecting one or several options in a list, while radios are for selecting one option from many.');
    }
}

export default new contactsController;