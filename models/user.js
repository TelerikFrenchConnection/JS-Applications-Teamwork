var User = function () {
    import inputValidators;
    //username, password, firstname, lastname, email
    var User = {
        init: function (userName, password,firstName, lastName, email) {
            this._userName = userName;
            this._password=password;
            this._firstName = firstName;
            this._lastName = lastName;
            this._email=email;
            return this;
        },

        get userName () {
            return this._userName;
        },

        set userName(newName) {
            
            validator.validateString(newName, 'User name');
            this.__userName = newName;
        },

        get firstName () {
            return this._firstName;
        },

        set firstName(newName) {
            
            validator.validateString(newName,'First name');
            this.__firstName = newName;
        },

        get lastName () {
            return this._lastName;
        },

        set lastName(newName) {
            validator.validateString(newName,'Last name');
            this.__lastName = newName;
        },
    }

    return User
}