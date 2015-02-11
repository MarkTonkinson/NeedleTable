var app = angular.module("NeedleTable");
app.service('tableService', function(){
	this.getColumnHeadings = function(){
		var columns = ['Col 1', 'Col 2', 'Col 3', 'Col 4', 'Col 5', 'Col 6', 'Total'];
		return columns;
	}
})