import 'parse';

Parse.initialize("QNCJAvVfAkxaHeSdMr0aB2rgIZrtn56qkeWavnKu", "7c8uGlEb0QURsxyTFyYgTKS7br4sb9cj4jpCTVcb");

// For general data add/remove
var data = {
    add: function (dataClass, dataObject) {
        var DataClass = Parse.Object.extend(dataClass);
        var data = new DataClass();
        return data.save(dataObject);
    },
    get: function (dataClass) {
        var query = new Parse.Query(Parse.Object.extend(dataClass));
        return query;
    }
};

export default data;
