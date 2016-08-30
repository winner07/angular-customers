angular.module("customers").controller("CustomerList", ["$scope", "$http", "getCustomers", "addCustomer", "editCustomer", "deleteCustomer", "moment", function($scope, $http, getCustomers, addCustomer, editCustomer, deleteCustomer, moment){
	$scope.customers;
	$scope.customerNew = {};
	
	
	// Get customers JSON
	getCustomers().then(function(data){
		 $scope.customers = data.data;
	});
	
	
	// Create customer
	$scope.create = function(customer){
		var date = moment().format("DD-MM-YYYY-HH-mm-ss");
		$scope.customerNew = customer;
		$scope.customerNew.fileName = "customer-" + date + ".json";
		$scope.customers.push($scope.customerNew);

		addCustomer($scope.customerNew);
		$scope.customerNew = {};
	};
	
	
	// Edit customer
	$scope.edit = function(customer){
		editCustomer(customer);
	};
	
	
	// Delete customer
	$scope.delete = function(customer, index){
		if(confirm("Are you sure to delete customer - \"" + customer.name + "\"")){
			$scope.customers.splice(index, 1);
			deleteCustomer(customer.fileName);
		}
	};
}]);