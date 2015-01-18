app.factory('Data', ['$q','$http', '$location', 
	function($q, $http, $location){
		var exports = {},
			serviceBase = 'api/v1/',
			massage = null;

		exports.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        exports.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        exports.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        exports.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };




		return exports;
	}
]);


