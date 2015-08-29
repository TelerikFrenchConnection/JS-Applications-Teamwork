CONSTANTS = {
    TEXT_MIN_LENGTH: 2,
    TEXT_MAX_LENGTH: 30,
    PASSWORD_PATTERN: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/,
    USER_NAME_PATTERN: /(^\w+$).{6,15}/,
    EMAIL_PATTERN: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    MAX_NUMBER: 9007199254740992,
    DEFALT: 'Value'
};

validate = {
    IfUndefined: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        if (value === undefined) {
            throw new Error(name + ' cannot be undefined');
        }
    },

    IfNumber: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        if (typeof value !== 'number') {
            throw new Error(name + ' must be a number');
        }
    },

    String: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        this.IfUndefined(value, name);

        if (typeof value !== 'string') {
            throw new Error(name + ' must be a string');
        }

        if (value.length < CONSTANTS.TEXT_MIN_LENGTH
            || CONSTANTS.TEXT_MAX_LENGTH < value.length) {
            throw new Error(name + ' must be between ' + CONSTANTS.TEXT_MIN_LENGTH +
                ' and ' + CONSTANTS.TEXT_MAX_LENGTH + ' symbols');
        }
    },

    PositiveNumber: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        this.IfUndefined(value, name);
        this.IfNumber(value, name);

        if (value <= 0) {
            throw new Error(name + ' must be positive number');
        }
    },

    Id: function (id) {
        this.IfUndefined(id, 'Object id');
        if (typeof id !== 'number') {
            id = id.id;
        }

        this.IfUndefined(id, 'Object must have id');
        return id;
    },

    Email: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        if (!CONSTANTS.EMAIL_PATTERN.test(value))
            throw new Error(name + ' is Invalid')
    },

    Password: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        if (!CONSTANTS.PASSWORD_PATTERN.test(value)) {
            throw new Error(name + ' must be between 8-20 symbols and to contains at least one: Uppercase letter, lowcase letter, and number ')
        }

    },

    UserName: function (value, name) {
        name = name || CONSTANTS.DEFALT;
        if (!CONSTANTS.USER_NAME_PATTERN(name)) {
            throw new Error(name + ' must be between 6-15 symbols and can contain only letters, numbers and underscore')
        }
    }
};

export default {
    CONSTANTS,
    validate
}
