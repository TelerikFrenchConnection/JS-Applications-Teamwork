import db from './database/dbContext.js';

import errorHelper from './helpers/errorHelper.js';
import Contact from './viewModels/contactViewModel.js';

class contactModel {
    addContact(email, name, title, text) {

        var contact = new Contact(email, name, title, text);
        console.log(contact);
        var promse = new Promise(function (resolve, reject) {
            var errors = errorHelper.getErrors();
            if (errors.length === 0) {
                db.add('Contacts', contact);
                resolve()
            } else {
                reject(errors);
            }

            errors = [];
        });

        return promse;
    }

    getContacts() {
        return db.get('Contact');
    }
}

export default new contactModel();