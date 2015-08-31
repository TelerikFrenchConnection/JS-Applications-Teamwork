var CONSTANTS = {
    TEXT_MIN_LENGTH: 2,
    TEXT_MAX_LENGTH: 30,
    PASSWORD_PATTERN: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/,
    USER_NAME_PATTERN: /\S[_a-zA-Z0-9]{6,15}/,
    EMAIL_PATTERN: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    SPECIAL_SYMBOLS_PATTERN: /[^.%,!?a-zA-Z0-9 ]/g,
    MAX_NUMBER: 9007199254740992,
    DEFAULT: 'Value',
    SPECIAL_SYMBOLS_MESSAGE:' special characters are not allowed except .,!? and % '
};

var validate = {
    ifUndefined: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (value === undefined) {
            sessionStorage.setObject(new Error(name, 'cannot be empty'));
        }
    },

    ifNumber: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (typeof value !== 'number') {
            sessionStorage.setObject(new Error(name, ' must be a number'));
        }
    },

    isString: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        this.ifUndefined(value, name);

        if (typeof value !== 'string') {
            sessionStorage.setObject(new Error(name, ' must contain only letters'));
        }

        if (value.length < CONSTANTS.TEXT_MIN_LENGT
            || CONSTANTS.TEXT_MAX_LENGTH < value.length) {
            sessionStorage.setObject( new Error(name + ' must be between ' + CONSTANTS.TEXT_MIN_LENGTH +
                ' and ' + CONSTANTS.TEXT_MAX_LENGTH + ' symbols'));
        }
    },

    positiveNumber : function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        this.ifUndefined(value, name);
        this.ifNumber(value, name);

        if (value <= 0) {
            sessionStorage.setObject( new Error(name, ' must be positive number'));
        }
    },

    email: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if(!CONSTANTS.EMAIL_PATTERN.test(value)){
            sessionStorage.setObject( new Error(name,' is Invalid'));
        }
    },

    password: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (!CONSTANTS.PASSWORD_PATTERN.test(value)) {
            sessionStorage.setObject(new Error(name , ' must contain one Uppercase, lowcase or number, 8-20 symbols '))
        }
    },

    userName: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (!CONSTANTS.USER_NAME_PATTERN.test(name)) {
            sessionStorage.setObject( new Error(name , ' must contain only letters, numbers and underscore 6-15 symbols'))
        }
    },

    price: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        this.ifUndefined(value, name);
        this.ifNumber(value, name);
    },

    safeText: function (value, name){
        name = name || CONSTANTS.DEFAULT;
        if(CONSTANTS.SPECIAL_SYMBOLS_PATTERN.test(value)){
            sessionStorage.setObject( new Error(name, CONSTANTS.SPECIAL_SYMBOLS_MESSAGE))
        }
    }
};

