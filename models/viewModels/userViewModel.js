import '../helpers/validatorHelper.js'

    class User {
        constructor(userName, password, firstName, lastName, email) {
            this.userNameProperty = userName;
            this.passwordProperty = password;
            this.firstNameProperty = firstName;
            this.lastNameProperty = lastName;
            this.emailProperty = email;
            return this;
        }

        get userNameProperty() {
            return this.userName;
        }

        set userNameProperty(newName) {

            validate.userName(newName, 'User name');
            this.userName = newName;

        }

        get firstNameProperty() {
            return this.firstName;
        }

        set firstNameProperty(newName) {
            validate.isString(newName, 'First name');
            this.firstName = newName;
        }

        get lastNameProperty() {
            return this._lastName;
        }

        set lastNameProperty(newName) {
            validate.isString(newName, 'Last name');
            this.lastName = newName;
        }

        get passwordProperty() {
            return this.password;
        }

        set passwordProperty(newPassword) {
            validate.password(newPassword, 'Password');
            this.password = newPassword;
        }

        get emailProperty() {
            return this._email
        }

        set emailProperty(newEmail) {
            validate.email(newEmail);
            this.email = newEmail;
        }
    }

export default User;
