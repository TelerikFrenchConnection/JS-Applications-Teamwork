import partialHelper from './partialsHelper.js';
import templatesHelper from './templatesHelper.js';

var headerHelper = (function(){
    function logoutChangeHeader() {

        $('.header-partial').html('');
        partialHelper.append('headerLoggedOutPartial', '.header-partial');
    }

    function loginChangeHeader() {

        $('.header-partial').html('');
        templatesHelper.appendSingle('headerLoggedInTemplate', Parse.User.current(), '.header-partial');
    }

    return {
        logoutChangeHeader,
        loginChangeHeader
    }
})();

export default headerHelper;
