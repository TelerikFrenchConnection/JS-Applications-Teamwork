var errorHelper = (function() {
    function getErrors() {
        var errors = [];

        for (let index = 0; index < sessionStorage.length; index += 1) {
            let storageKey = sessionStorage.key(index);
            let errorObject = sessionStorage.getObject(storageKey);

            errors.push(errorObject);
        }

        sessionStorage.clear();
        return errors;
    }

    return {
        getErrors
    };
})();

export default errorHelper;