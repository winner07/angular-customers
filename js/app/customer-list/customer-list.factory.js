angular.module("customers").factory("getCustomersJSON", ["$http", function($http){
	return function(){
		return $http.get("http://localhost:8080", {
			responseType : "json"
		});
	};
}]);