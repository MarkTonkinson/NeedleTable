var app = angular.module("NeedleTable");

app.controller("tableCtrl", function($scope, tableService){
	
	$scope.table = {
		colHeads: tableService.getColumnHeadings(),
		columnTotals: tableService.getColumnTotalsArray(),
		rows: [],
		multiply: function(val, index, cb){
			if(typeof val === "string"){
				
				val = parseFloat(val).toFixed(2)
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
			var num = total.val;
			if(typeof total.val === 'string'){
				num = num.replace('$','')
				num = parseFloat(num)
			}
			if(total.addRowFlag === true && num > 0){
				this.formNewRow();
				total.addRowFlag = false;
			}
		},
		sumColumn: function(columnRef, oldVal, newVal){
			
			var i = columnRef.replace('col', '')
			i = i-1;
			
			var total = this.columnTotals[i][columnRef]
			total = total.replace('$','')
			
			total = parseFloat(total)
			total -= parseFloat(oldVal)
			total += parseFloat(newVal)
			total = total.toFixed(2)
			this.columnTotals[i][columnRef] = '$' + total;
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
					readOnly: function(){
						return false
					},
					focus: function(){
						if(this.val === '0'){
							this.val = '';
						}
					},
					blur: function(row){
						if(this.val === ''){
							this.val ='0'
							$scope.table.sumRow(row, this.valRef, this.val);
							$scope.table.sumColumn(this.columnRef, this.valRef, this.val)
							this.valRef ='0'

						}
					},
					equation: function(row){
					//NaN situations and commas
					if(parseFloat(this.val) !== parseFloat(this.val) || this.val.indexOf(',') > -1){
						this.val=''
					}
					if(this.val !== this.valRef && this.val !== ''){
							//using "this.equations" didn't go to the parent prototype- how do I do that? 
							//also, because I'm not using a constructor this is creating this function again and again
							//I think this would need to be a constructor to share the parent prototype? Need to research
							
							newVal = $scope.table.multiply(this.val, this.index);
							$scope.table.sumRow(row, this.valRef, newVal);
							$scope.table.sumColumn(this.columnRef, this.valRef, newVal)
							this.valRef = newVal
						}
					}
				}
				row.push(obj)
			}
			row.push({
				addRowFlag: true,
				val: '$0.00',
				total: function(oldVal, newVal){
					if(this.val === '$0.00'){
						this.val = '0'
					} else if (typeof this.val === "string"){
						
						this.val = this.val.replace('$','')
						
					}
					this.val = parseFloat(this.val)
					this.val -= oldVal;
					this.val += newVal;
					returnableVal = this.val;
					this.setTotal()
					return this.val

				},
				setTotal: function(){
					this.val = '$' + parseFloat(this.val).toFixed(2)
				},
				readOnly: function(){
					return true
				}
			})
			this.rows.push(row)
		}

	};

	
	var initTable = function(){
		if($scope.table.rows.length === 0){
			$scope.table.formNewRow();
		}
	};
	initTable()
	
	

});