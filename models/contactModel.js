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
        validate.email(newEmail, 'email');
        this.email = newEmail;
    }

    get nameProperty() {
        return this.name
    }

    set nameProperty(newName) {
        validate.isString(newName, 'title');
        this.name = newName;
    }

    get titleProperty() {
        return this.title
    }

    set titleProperty(newTitle) {
        validate.isString(newTitle, 'title');
        this.title = newTitle;
    }

    get textProperty() {
        return this.text
    }

    set textProperty(newText) {
        //TODO: validation against harmfull script
        this.text = newText;
    }
}

export default Contact;