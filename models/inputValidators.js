﻿CONSTANTS = {
    TEXT_MIN_LENGTH: 2,
    TEXT_MAX_LENGTH: 30,
    PASSWORD_PATTERN: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/,
    USER_NAME_PATTERN: /(^\w+$).{6,15}/,
    EMAIL_PATTERN: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    MAX_NUMBER: 9007199254740992,
    DEFALT: 'Value'
};

validator = {
    validateIfUndefined: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        if (value === undefined) {
            throw new Error(name + ' cannot be undefined');
        }
    },

    validateIfNumber: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        if (typeof value !== 'number') {
            throw new Error(name + ' must be a number');
        }
    },

    validateString: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        this.validateIfUndefined(value, name);

        if (typeof value !== 'string') {
            throw new Error(name + ' must be a string');
        }

        if (value.length < CONSTANTS.TEXT_MIN_LENGTH
            || CONSTANTS.TEXT_MAX_LENGTH < value.length) {
            throw new Error(name + ' must be between ' + CONSTANTS.TEXT_MIN_LENGTH +
                ' and ' + CONSTANTS.TEXT_MAX_LENGTH + ' symbols');
        }
    },

    validatePositiveNumber: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        this.validateIfUndefined(value, name);
        this.validateIfNumber(value, name);

        if (value <= 0) {
            throw new Error(name + ' must be positive number');
        }
    },

    validateId: function (id) {
        this.validateIfUndefined(id, 'Object id');
        if (typeof id !== 'number') {
            id = id.id;
        }

        this.validateIfUndefined(id, 'Object must have id');
        return id;
    },

    validateEmail: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        if (!CONSTANTS.EMAIL_PATTERN.test(value))
            throw new Error(name + ' is Invalid')
    },

    validatePassword: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        if (!CONSTANTS.PASSWORD_PATTERN.test(value)) {
            throw new Error(name + ' must be between 8-20 symbols and to contains at least one: Uppercase letter,lowcase letter, and number ')
        }

    },

    validateUserName: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        if (!CONSTANTS.USER_NAME_PATTERN(name)) {
            throw new Error(name + ' must be between 6-15 symbols and can contain only letters, numbers and underscore')
        }
    }
};
