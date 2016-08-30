angular.module("customers")
.factory("customers", ["$http", "serverHost", "customersDir", function($http, serverHost, customersDir){
	return {
		get : function(){
				return $http.get(serverHost, {
					responseType : "json"
				});
			},
		add : function(customer){
			return $http.post(serverHost + customersDir, JSON.stringify(customer), {
				headers : {
					"Content-Type": "application/json;charset=UTF-8"
				}
			});
		},
		edit : function(customer){
			return $http.put(serverHost + customersDir + customer.fileName, JSON.stringify(customer), {
				headers : {
					"Content-Type": "application/json;charset=UTF-8"
				}
			});
		},
		delete : function(fileName){
			return $http.delete(serverHost + customersDir + fileName);
		}
	};
}]);