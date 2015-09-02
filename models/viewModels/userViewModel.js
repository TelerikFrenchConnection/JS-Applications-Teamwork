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
            return this.username;
        }

        set userNameProperty(newName) {
            validate.userName(newName, 'user name');
            this.username = newName;

        }

        get firstNameProperty() {
            return this.firstName;
        }

        set firstNameProperty(newName) {
            validate.name(newName, 'first name');
            this.firstName = newName;
        }

        get lastNameProperty() {
            return this.lastName;
        }

        set lastNameProperty(newName) {
            validate.name(newName, 'past name');
            this.lastName = newName;
        }

        get passwordProperty() {
            return this.password;
        }

        set passwordProperty(newPassword) {
            validate.password(newPassword, 'password');
            this.password = newPassword;
        }

        get emailProperty() {
            return this.email
        }

        set emailProperty(newEmail) {
            validate.email(newEmail, 'email');
            this.email = newEmail;
        }
    }

export default User;
