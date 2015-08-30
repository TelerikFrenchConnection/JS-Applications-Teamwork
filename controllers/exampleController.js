import _ from 'underscore';
import db from 'dbContext';

import templatesHelper from '../views/helpers/templatesHelper.js';
import pagesHelper from '../views/helpers/pagesHelper.js';

import exampleModel from 'models/exampleModel.js';

var exampleController = (function(){
    function load() {
        pagesHelper.append('example');
        var model = exampleModel.init('aaaa', 'Gosho');


        db.data.add('Example', model);



        db.data.get('Example', function(allExamples){
            allExamples.forEach(function(example){
                templatesHelper.append('libraryBookTemplate', example, '#template-target');
            })
        });

        /*
        var query = db.data.getQuery('Book');
        query.limit(1);
        query.find().then(function(result){
            console.log(result);
        })*/
    }

    return load;
})();

export default {
    load: exampleController
}