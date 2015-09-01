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
            var $templateHolder = $('<div/>');

            data.forEach(function(item){
                var templateHTML = templateCompiled(item);
                $templateHolder.append(templateHTML);
            });

            $(target).append($templateHolder.html());
        })
    }

    function appendSingle(templateName, data, target) {
        return get(templateName).then(function(template) {
            var templateCompiled = Handlebars.compile(template);
            var templateHTML = templateCompiled(data);
            $(target).append(templateHTML);
        })
    }

    return {
        get,
        append,
        appendSingle,
    }
})();

export default templatesHelper;