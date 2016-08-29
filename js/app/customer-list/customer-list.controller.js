angular.module("customers").controller("CustomerList", ["$scope", "$http", "getCustomersJSON", function($scope, $http, getCustomersJSON){
	$scope.customers;
	$scope.customerNew = {};
	
	
	// Get customers JSON
	getCustomersJSON().then(function(data){
		 $scope.customers = data.data;
	});
	
	
	// Create customer
	$scope.create = function(customer){
		var date = new Date();
		var dateNormalize = {
			date : date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
			month : date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth(),
			year : date.getFullYear(),
			hour : date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
			minute : date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
			seconds : date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
		};
		$scope.customerNew = customer;
		$scope.customerNew.fileName = "customer-" + dateNormalize.date + "-"
		                              + dateNormalize.month + "-"
									  + dateNormalize.year + "-"
									  + dateNormalize.hour + "-"
									  + dateNormalize.minute + "-"
									  + dateNormalize.seconds + ".json";
		$scope.customers.push($scope.customerNew);

		$http.post("http://localhost:8080/customers/", JSON.stringify($scope.customerNew), {
			headers : {
				"Content-Type": "application/json;charset=UTF-8"
			}
		});
		$scope.customerNew = {};
	};
	
	
	// Edit customer
	$scope.edit = function(customer){
		$http.put("http://localhost:8080/customers/" + customer.fileName, JSON.stringify(customer), {
			headers : {
				"Content-Type": "application/json;charset=UTF-8"
			}
		});
	};
	
	
	// Delete customer
	$scope.delete = function(fileName, index){
		$scope.customers.splice(index, 1);
		$http.delete("http://localhost:8080/customers/" + fileName);
	};
}]);