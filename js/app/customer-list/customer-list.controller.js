angular.module("customers").controller("CustomerList", ["$scope", "$http", "customers", "moment", function($scope, $http, customers, moment){
	$scope.customers;
	$scope.customerNew = {};
	
	// Get customers JSON
	customers.get().then(function(data){
		 $scope.customers = data.data;
	});
	
	
	// Create customer
	$scope.create = function(customer){
		var date = moment().format("DD-MM-YYYY-HH-mm-ss");
		$scope.customerNew = customer;
		$scope.customerNew.fileName = "customer-" + date + ".json";
		$scope.customers.push($scope.customerNew);

		customers.add($scope.customerNew);
		$scope.customerNew = {};
	};
	
	
	// Edit customer
	$scope.edit = function(customer){
		customers.edit(customer);
	};
	
	
	// Delete customer
	$scope.delete = function(customer, index){
		if(confirm("Are you sure to delete customer - \"" + customer.name + "\"")){
			$scope.customers.splice(index, 1);
			customers.delete(customer.fileName);
		}
	};
}]);