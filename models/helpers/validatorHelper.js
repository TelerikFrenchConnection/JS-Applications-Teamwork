var CONSTANTS = {
    TEXT_MIN_LENGTH: 2,
    TEXT_MAX_LENGTH: 30,
    MAX_NUMBER: 9007199254740992,
    NAME_PATTERN: /[^a-zA-Z]/,
    PASSWORD_PATTERN: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/,
    USER_NAME_PATTERN: /\S[_a-zA-Z0-9]{6,15}/,
    EMAIL_PATTERN: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    RESTRICTED_SYMBOLS_PATTERN: /[<>$@#&]/gm,             ///[^\.%,!\?a-zA-Z0-9 ]/g,
    DEFAULT: 'Value',
    INVALID_VALUE_MESSAGE: 'must be filled and in valid format',
    INVALID_ISBN_MESSAGE: 'must contain exactly 10 or 13 digits',
    INVALID_SYMBOLS_MESSAGE: 'must not contain special characters as <, > and $',
    INVALID_PASSWORD_MESSAGE: 'must contain at last one uppercase, lowcase or number and be 8-20 symbols long',
    INVALID_USERNAME_MESSAGE: 'must contain only letters, numbers or underscore and be 6-15 symbols'
};

var validate = {
    isChar: function (symbol) {
        return isNaN(+symbol)
    },

    isUndefined: function (value) {
        return (value === undefined)
    },

    price: function (value, name) {
        name = name || CONSTANTS.DEFAULT;

        var isInRange = false;

        if (!this.isUndefined(value) && !isNaN(+value)) {
            isInRange = (0 >= value && value <= CONSTANTS.MAX_NUMBER)
        }

        if (!isInRange) {
            sessionStorage.setObject(name, {
                name: name,
                message: CONSTANTS.INVALID_VALUE_MESSAGE
            });
        }
    },

    ISBN: function (value, name) {
        var isString = typeof (value) === 'string';
        var hasCorrectLength = value.length === 10 || value.length === 13;
        var hasOnlyDigits = !(value.split('').some(this.isChar));
        if (!isString || !hasCorrectLength || !hasOnlyDigits) {
            sessionStorage.setObject(name, {
                name: name,
                message: CONSTANTS.INVALID_ISBN_MESSAGE
            });
        }
    },

    name: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        var isInRange = value.length > CONSTANTS.TEXT_MIN_LENGTH && value.length <= CONSTANTS.TEXT_MAX_LENGTH;
        var hasOnlyLetters = !CONSTANTS.NAME_PATTERN.test(value);
        if (!isInRange || !hasOnlyLetters) {
            sessionStorage.setObject(name, {
                name: name,
                message: CONSTANTS.INVALID_VALUE_MESSAGE
            });
        }
    },

    email: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (!CONSTANTS.EMAIL_PATTERN.test(value)) {
            sessionStorage.setObject(name, {
                name: name,
                message: CONSTANTS.INVALID_VALUE_MESSAGE
            });
        }
    },

    password: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (!CONSTANTS.PASSWORD_PATTERN.test(value)) {
            sessionStorage.setObject(name, {
                name: name,
                message: CONSTANTS.INVALID_PASSWORD_MESSAGE
            });
        }
    },

    userName: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (!CONSTANTS.USER_NAME_PATTERN.test(name)) {
            sessionStorage.setObject(name, {
                name: name,
                message: CONSTANTS.INVALID_USERNAME_MESSAGE
            });
        }
    },

    safeText: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (CONSTANTS.RESTRICTED_SYMBOLS_PATTERN.test(value)) {
            sessionStorage.setObject(name, {
                name: name,
                message: CONSTANTS.INVALID_SYMBOLS_MESSAGE
            });
        }
    }
};

