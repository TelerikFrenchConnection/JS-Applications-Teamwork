var CONSTANTS = {
    TEXT_MIN_LENGTH: 2,
    TEXT_MAX_LENGTH: 30,
    MAX_NUMBER: 9007199254740992,
    NAME_PATTERN: /[^a-zA-Z]/,
    PASSWORD_PATTERN: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/,
    USER_NAME_PATTERN:/\S[_a-zA-Z0-9]{6,15}/ ,
    EMAIL_PATTERN: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    RESTRICTED_SYMBOLS_PATTERN:/[<>$@#&]/gm,             ///[^\.%,!\?a-zA-Z0-9 ]/g,
    DEFAULT: 'Value',
    INVALID_MESSAGE:'is Invalid',
    RESTRICTED_SYMBOLS_MESSAGE: 'special characters as <, > and $ are not allowed'
};


//function isString(str, min, max) {
//    if (typeof (str) !== 'string' ||
//        str.length < min ||
//        str.length > max) {
//        return ('The string must have between ' + min + ' and ' + max + ' characters');
//    }
//}

var validate = {
    isChar: function(symbol) {
        return isNaN(+symbol)
    },

    //TODO
    isUndefined: function (value) {
        return (value === undefined)
    },


     isNumber: function (value) {

        return ( value !== 'number')
    },

    price: function (value, name) {
     name = name || CONSTANTS.DEFAULT;

        var isInRange=false;
        if (!this.isUndefined(value)&&!isNaN(+value)) {
            isInRange = (0>=value && value <= CONSTANTS.MAX_NUMBER)
        }
        if(!isInRange){
            sessionStorage.setObject('Error', {
                name: name,
                message: CONSTANTS.INVALID_MESSAGE
            });
        }
     },

    ISBN: function (value,name) {
        var isString = typeof (value) === 'string';
        var hasCorrectLength = value.length === 10 || value.length === 13;
        var hasOnlyDigits = !(value.split('').some(this.isChar));
        if (!isString || !hasCorrectLength || !hasOnlyDigits){
            sessionStorage.setObject('Error', {
                name: name,
                message: ' The ISBN must contain exactly 10 or 13 digits'
            });
        }
    },

    name: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        var isInRange = value.length > CONSTANTS.TEXT_MIN_LENGTH && value.length <= CONSTANTS.TEXT_MAX_LENGTH;
        var hasOnlyLetters = !CONSTANTS.NAME_PATTERN.test(value);
        if (!isInRange || !hasOnlyLetters) {
            sessionStorage.setObject('Error', {
                name: name,
                message: CONSTANTS.INVALID_MESSAGE
            });
        }
    },

    email: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (!CONSTANTS.EMAIL_PATTERN.test(value)) {
            sessionStorage.setObject('Error', {
                name: name,
                message: CONSTANTS.INVALID_MESSAGE});
        }
    },

    password: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (!CONSTANTS.PASSWORD_PATTERN.test(value)) {
            sessionStorage.setObject('Error', {
                name: name,
                message: ' must contain one Uppercase, lowcase or number and length 8-20 '
        });
        }
    },

   userName: function (value, name) {
        name = name || CONSTANTS.DEFAULT;
        if (!CONSTANTS.USER_NAME_PATTERN.test(name)) {
            sessionStorage.setObject('Error', {
                name: name,
                message: 'must contain only letters, numbers or underscore and length 6-15'
            });
        }
    },

    safeText: function (value, name) {
       name = name || CONSTANTS.DEFAULT;
        if (CONSTANTS.RESTRICTED_SYMBOLS_PATTERN.test(value)) {
           sessionStorage.setObject('Error', {
               name: name,
               message: CONSTANTS.SPECIAL_SYMBOLS_MESSAGE
           });
        }
    }
}

