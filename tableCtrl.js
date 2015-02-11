var app = angular.module("NeedleTable");

app.controller("tableCtrl", function($scope, tableService){
	
	$scope.table = {
		colHeads: tableService.getColumnHeadings(),
		rows: [],
		row1: [],
		totalRow: ['0','0','0','0','0','0','0'],
		equations: {
			multiply: function(val, colIndex){
				if(typeof val === "string"){
					//parseFloat because they give decimals
					val = parseFloat(val)
				}
				if(typeof colIndex === "string"){
					colIndex = parseInt(colIndex)
				}
				return val * colIndex
			}
		},
		rowCounter: function(){
			var counter = 1;
			return function(){
				counter++
				return counter;
				
			}
		},
		rowCounterPlus: function(){
			var runCounter = this.rowCounter()
			return runCounter()
		},
		addRow: function(){

		},
		formNewRow: function(){
			var row;
			if(this.row1.length === 0){
				row = 'row1'
			} else {
				row = 'row' + this.rowCounterPlus();
				this[row] = [];			
			}
			for(var i=0; i<this.colHeads.length; i++){
				var ref = "col" + i;
				var obj = {
					ref: i,
					val: '0',
					equation: function(){
						this.val = equations.multiply(val, ref);
					}
				}
				this[row].push(obj)

			}
			this.rows.push(this[row])
		},
		sumRow: function(){
			this.formNewRow();
			console.log(this)

		}

	}

	$scope.table.sumRow()
	$scope.table.sumRow();
});