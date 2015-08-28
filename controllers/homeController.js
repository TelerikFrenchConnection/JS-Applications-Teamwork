import db from '../models/db.js';

// import OOP models for home page

function load() {
    $.get('./views/home.html', function(result) {
        $('#content').append(result);
    });

    /*db.addData('Book', {
        title: 'Configurating Parse backend',
        category: 'Horror'
    });

     Commented to prevent database spam on each refresh
    */
}

export default {
    load: load
}