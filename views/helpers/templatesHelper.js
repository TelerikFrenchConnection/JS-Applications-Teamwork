import Handlebars from 'handlebars';

var templatesHelper = (function() {
    function get(templateName) {
        return new Promise(function(success){
            var path = 'views/templates/' + templateName + '.html';

            $.get(path).then(function(result){
                success(result);
            }, function(error) {
                console.log('Failed to load template ' + templateName);
                console.log(error);
            })
        })
    }

    function append(templateName, data, target) {
        return get(templateName).then(function(template) {
            var templateCompiled = Handlebars.compile(template);
            var templateHTML = templateCompiled(data.attributes);
            $(target).append(templateHTML);
        })
    }

    return {
        get,
        append
    }
})();

export default templatesHelper;