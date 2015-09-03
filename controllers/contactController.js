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

    contactPost(sammy){

            var name = sammy.params['name'];
            var email = sammy.params['email'];
            var title = sammy.params['title'];
            var text = sammy.params['text'];

            contactModel.addContact(email, name, title, text)
                .then(function() {
                    sammy.redirect('#/home');
                }, function(errors) {
                    templatesHelper.set('warning', errors, '.warning');
                });
        }
}

export default new contactsController;