var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	
	var refresh = function() {
		$http.get('/contactlist').then(function(responce){
			//console.log('requested for data');
			$scope.contactlist = responce.data;
		});
	};

	refresh();
	

	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact);
		refresh();
	};

	$scope.remove = function(id) {
		//console.log(id);
		$http.delete('/contactlist/' + id).then(function(responce){
			refresh();
		});
	};

	$scope.edit = function(id) {
		//console.log(id);
		$http.get('/contactlist/' + id).then(function(responce){
			//console.log(responce.data);
			$scope.contact = responce.data;
		});
	}

	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(responce){
			refresh();
		});
	}
	
});