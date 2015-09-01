var pagesHelper = (function(){
    function get(pageName) {
        return new Promise(function(success){
            var path = 'views/' + pageName + '.html';

            $.get(path).then(function(result){
                success(result);
            }, function(error) {
                console.log('Failed to load page ' + pageName);
                console.log(error);
            });
        });
    }

    function append(pageName) {
        return get(pageName).then(function(page) {
            $('#content').html(page);
        });
    }

    return {
        get,
        append
    }
})();

export default pagesHelper;