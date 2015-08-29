CONSTANTS = {
    TEXT_MIN_LENGTH: 2,
    TEXT_MAX_LENGTH: 30,
    PASSWORD_PATTERN: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/,
    USER_NAME_PATTERN: /(^\w+$).{6,15}/,
    EMAIL_PATTERN: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    MAX_NUMBER: 9007199254740992,
    DEFAULT: 'Value'
};

validate = {
    ifUndefined: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (value === undefined) {
            throw new Error(name + ' cannot be undefined');
        }
    },

    ifNumber: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (typeof value !== 'number') {
            throw new Error(name + ' must be a number');
        }
    },

    isString: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        this.ifUndefined(value, name);

        if (typeof value !== 'string') {
            throw new Error(name + ' must be a string');
        }

        if (value.length < CONSTANTS.TEXT_MIN_LENGTH
            || CONSTANTS.TEXT_MAX_LENGTH < value.length) {
            throw new Error(name + ' must be between ' + CONSTANTS.TEXT_MIN_LENGTH +
                ' and ' + CONSTANTS.TEXT_MAX_LENGTH + ' symbols');
        }
    },

    positiveNumber : function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        this.ifUndefined(value, name);
        this.ifNumber(value, name);

        if (value <= 0) {
            throw new Error(name + ' must be positive number');
        }
    },


    email: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if(!CONSTANTS.EMAIL_PATTERN.test(value)){
            throw new Error(name + ' is Invalid');
        }
    },

    password: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (!CONSTANTS.PASSWORD_PATTERN.test(value)) {
            throw new Error(name + ' must be between 8-20 symbols and to contains at least one: Uppercase letter, lowcase letter, and number ')
        }
    },

    userName: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (!CONSTANTS.USER_NAME_PATTERN(name)) {
            throw new Error(name + ' must be between 6-15 symbols and can contain only letters, numbers and underscore')
        }
    },

    price: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        this.ifUndefined(value, name);
        this.ifNumber(value, name);
    }
};

