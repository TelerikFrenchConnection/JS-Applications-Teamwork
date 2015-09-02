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
    },
    remove: function (dataClass, dataObject) {
    	var DataClass = Parse.Object.extend(dataClass);
        var data = new DataClass();
        data.get(dataObject, {
		  success: function(myObj) {
		    console.log('success at destroying book object');
		    myObj.destroy({});
		  },
		  error: function(object, error) {
		    // The object was not retrieved successfully.
		    console.log('Error at destroying book object');
		  }
		});
    }
};

export default data;
