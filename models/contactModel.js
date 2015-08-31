import db from './database/dbContext.js';
import Contact from './viewModels/contactViewModel.js';

class contactModel {
    addContact(email, name, title, text) {
        var contact = new Contact(email, name, title, text);

        // Add error handling logic

        ses

        // db.add('Contact', contact);
    }

    getContacts() {
        return db.get('Contact');
    }
}

export default new contactModel();