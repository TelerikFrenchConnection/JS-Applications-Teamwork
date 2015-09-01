import partialHelper from './partialsHelper.js';
import templatesHelper from './templatesHelper.js';

var headerHelper = (function(){
    function updateHeader() {
        return templatesHelper.get('headerTemplate').then(function(template) {
            var templateCompiled = Handlebars.compile(template);
            var templateHTML = templateCompiled(Parse.User.current());
            $('.header-partial').html(templateHTML);
        })
    }

    return {
        updateHeader
    }
})();

export default headerHelper;
