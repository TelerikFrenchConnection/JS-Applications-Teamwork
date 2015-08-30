import './helpers/validatorHelper.js'

class Contact {
    constructor(email, name, title, text) {
        this.emailProperty = email;
        this.nameProperty = name;
        this.titleProperty = title;
        this.textProperty = text;
    }

    get emailProperty() {
        return this.email
    }

    set emailProperty(newEmail) {
        validate.email(newEmail, 'Email');
        this.email = newEmail;
    }

    get nameProperty() {
        return this.name
    }

    set nameProperty(newName) {
        validate.isString(newName, 'Name');
        this.name = newName;
    }

    get titleProperty() {
        return this.title
    }

    set titleProperty(newTitle) {
        validate.isString(newTitle, 'Title');
        this.title = newTitle;
    }

    get textProperty() {
        return this.text
    }

    set textProperty(newText) {
        validate.safeText(newText, 'Text');
        this.text = newText;
    }
}

export default Contact;