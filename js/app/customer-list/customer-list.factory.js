angular.module("customers")
.factory("getCustomers", ["$http", "serverHost", "customersDir", function($http, serverHost, customersDir){
	return function(){
		return $http.get(serverHost, {
			responseType : "json"
		});
	};
}])
.factory("addCustomer", ["$http", "serverHost", "customersDir", function($http, serverHost, customersDir){
	return function(customer){
		return $http.post(serverHost + customersDir, JSON.stringify(customer), {
			headers : {
				"Content-Type": "application/json;charset=UTF-8"
			}
		});
	};
}])
.factory("editCustomer", ["$http", "serverHost", "customersDir", function($http, serverHost, customersDir){
	return function(customer){
		return $http.put(serverHost + customersDir + customer.fileName, JSON.stringify(customer), {
			headers : {
				"Content-Type": "application/json;charset=UTF-8"
			}
		});
	};
}])
.factory("deleteCustomer", ["$http", "serverHost", "customersDir", function($http, serverHost, customersDir){
	return function(fileName){
		return $http.delete(serverHost + customersDir + fileName);
	};
}]);