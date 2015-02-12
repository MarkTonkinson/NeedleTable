var app = angular.module("NeedleTable");
app.service('tableService', function(){
	this.getColumnHeadings = function(){
		var columns = ['Col 1', 'Col 2', 'Col 3', 'Col 4', 'Col 5', 'Col 6', 'Total'];
		return columns;
	}
	this.getColumnTotalsArray = function(){
		var arr = []
		for(var i=1; i<7; i++){
			var obj = {};
			var key = 'col' + i
			obj[key] = '$0.00'
			arr.push(obj)
		}
		return arr;
	}
})