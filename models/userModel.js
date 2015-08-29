import validate from './helpers/validatorHelper.js'

var User = function () {

    //username, password, firstname, lastname, email
    var User = {
        init: function (userName, password,firstName, lastName, email) {
            this._userName = userName;
            this._password = password;
            this._firstName = firstName;
            this._lastName = lastName;
            this._email = email;
            return this;
        },

        get userName () {
            return this._userName;
        },

        set userName(newName) {
            
            validate.userName(newName, 'User name');
            this._userName = newName;
        },

        get firstName () {
            return this._firstName;
        },

        set firstName(newName) {
            validate.isString(newName,'First name');
            this._firstName = newName;
        },

        get lastName () {
            return this._lastName;
        },

        set lastName(newName) {
            validate.isString(newName,'Last name');
            this._lastName = newName;
        },

        get password (){
            return this._password;
        },

        set password(newPassword){
            validate.password(newPassword, 'Password');
            this._password=newPassword;
        },

        get email(){
            return this._email
        },

        set email(newEmail){
            validate.email(newEmail);
            this._email= newEmail;
        }
    };

    return User;
};

