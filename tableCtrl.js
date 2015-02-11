var app = angular.module("NeedleTable");

app.controller("tableCtrl", function($scope, tableService){
	$scope.colHeads = tableService.getColumnHeadings();

});