import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';
import Contact from '../models/contactModel.js'

// import OOP models for contacts page

var contactsController = (function() {
    function load() {
        pagesHelper.append('contact');

       //try
        var model=new Contact('d.dragoeva@abv.bg', 'Dushka', 'Java Script','Checkboxes are for selecting one or several options in a list, while radios are for selecting one option from many.');

        console.log(model);
        db.data.add('test', model);

    }

    return load;
})();

export default {
    load: contactsController
}