var app = angular.module("NeedleTable");

app.controller("tableCtrl", function($scope, tableService){
	//to do, need to check if my inputs are dirty so it doesn't just keep adding up or multplying
	$scope.table = {
		colHeads: tableService.getColumnHeadings(),
		rows: [],
		columnTotals: [],
		multiply: function(val, index, cb){
			if(typeof val === "string"){
				//parseFloat because they give decimals
				val = parseFloat(val)
			}
			if(typeof index === "string"){
				index = parseInt(index)
			}
			return val * index
		},
		sumRow: function(row, oldVal, newVal){
			var total = row[6]
			oldVal = parseFloat(oldVal)
			newVal = parseFloat(newVal)
			total.total(oldVal, newVal);
			var num = parseFloat(total.val);
			if(total.addRowFlag === true && num > 0){
				this.formNewRow();
				total.addRowFlag = false;
			}
			console.log($scope.table.rows)
		},
		sumColumn: function(columnRef, oldVal, newVal){
			
			var i = columnRef.replace('col', '')
			i = parseFloat(i)
			i = i-1;
			var total = this.columnTotals[i][columnRef]
			total = parseFloat(total);
			total -= oldVal;
			total += newVal;
			this.columnTotals[i][columnRef] = total.toString();
			console.log(columnRef, i, total)
		},
		formNewRow: function(){
			var row = []
			for(var i=0; i<this.colHeads.length-1; i++){
				var ref="col"+ (i+1);
				var obj = {
					columnRef: ref,
					index: i + 1,
					val: '0',
					valRef: '0',
					equation: function(row){
						if(this.val === ''){
							this.val = '0'
						} else if (this.val !== this.valRef){
							//using "this.equations" didn't go to the parent prototype- how do I do that? also, because I'm not using a constructor this is creating this function again and again
							//I think this would need to be a constructor to share the parent prototype? Need to research
							this.val = $scope.table.multiply(this.val, this.index);
							$scope.table.sumRow(row, this.valRef, this.val);
							$scope.table.sumColumn(this.columnRef, this.valRef, this.val)
							this.valRef = this.val;
						}
					}
				}
				row.push(obj)
			}
			row.push({
				addRowFlag: true,
				val: '0',
				total: function(oldVal, newVal){
					this.val = parseFloat(this.val);
					this.val -= oldVal;
					this.val += newVal;
					this.val = this.val.toString()
				}
			})
			this.rows.push(row)
		}

	};

	
	var initTable = function(){
		if($scope.table.rows.length === 0){
			$scope.table.formNewRow();
		}
		
		for(var i=1; i<7; i++){
			var obj = {};
			var key = 'col' + i
			obj[key] = '0'
			$scope.table.columnTotals.push(obj)
		}
		console.log($scope.table.columnTotals)
	};
	initTable()
	
	

});