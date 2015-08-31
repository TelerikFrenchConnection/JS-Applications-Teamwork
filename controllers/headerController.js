import _ from 'underscore';
import db from 'dbContext';

import partialHelper from '../views/helpers/partialsHelper.js';
import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

class headerController {
    loggedIn() {
        var $adminLink = $('<a/>')
            .attr('href', '#/admin')
            .text('Admin');
        var $adminItem = $('<li/>').append($adminLink);
        $('.nav-header').append($adminItem);

        $('.header-partial').html('');
        templatesHelper.appendSingle('headerLoggedInTemplate', Parse.User.current(), '.header-partial');
    }

    loggedOut() {
        $('.header-partial').html('');
        partialHelper.append('headerLoggedOutPartial', '.header-partial');
    }
}

export default new headerController;