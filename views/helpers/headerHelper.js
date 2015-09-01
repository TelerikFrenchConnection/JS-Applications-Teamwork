import templatesHelper from './templatesHelper.js';
import pagesHelper from './pagesHelper.js';

var headerHelper = (function(){
    function updateHeader() {
        return templatesHelper.get('header').then(function(template) {
            var templateCompiled = Handlebars.compile(template);
            var templateHTML = templateCompiled(Parse.User.current());
            pagesHelper.appendHTML(templateHTML, '.header-partial')
        })
    }

    return {
        updateHeader
    }
})();

export default headerHelper;
