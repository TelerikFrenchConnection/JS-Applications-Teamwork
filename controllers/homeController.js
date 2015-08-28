function load() {
    $.get('./views/home.html', function(result) {
        $('#content').append(result);
    });
}

export default {
    load: load
}