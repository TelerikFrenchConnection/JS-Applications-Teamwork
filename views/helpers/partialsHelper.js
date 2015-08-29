var partialHelper = (function(){
   'use strict';
    function get(partialName) {
        return new Promise(function(success){
            var path = 'partials/' + partialName + '.html';

            $.get(path).then(function(result){
                success(result);
            }, function(error) {
                console.log('Failed to load partial ' + partialName);
                console.log(error);
            })
        });
    }

    function append(partialName, target) {
        get(partialName).then(function(partial) {
            $(target).html(partial)
        });
    }

    return {
        get,
        append
    }
})();

export default partialHelper;