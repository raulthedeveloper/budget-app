const model = (function () {

	let Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}

	let Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}

	let data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			inc: 0,
			exp: 0,
		},
		budget: 0,
		percentage: -1


	}

	var calculateTotal = function(type) {
		var sum = 0;
		if(type == 'inc'){
			data.allItems[type].forEach(function(cur) {
				sum += parseInt(cur.value);
			});
		}else if(type == 'exp'){
			data.allItems[type].forEach(function(cur) {
				sum -= parseInt(cur.value);
			});
		}
        
		data.totals[type] = sum;
		console.log(sum)
	};
	
	



	return {
		addItem: function (type, des, val) {
			let newItem, ID;
			//Create new ID
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

			}else{
				ID = 0;

			}

			//Create conditional that seperates by type
			if (type == 'inc') {
				newItem = new Income(ID, des, val);
			} else if (type == 'exp') {
				newItem = new Expense(ID, des, val)
			}

			//store object in data allItems either inc or exp
			data.allItems[type].push(newItem);
			return newItem;

		},

		calculateBudget: function(){
			calculateTotal('inc');
			calculateTotal('exp');

			data.budget = data.totals.inc + data.totals.exp;



		},

		getBudget:function(){
			return {
				total:data.budget,
				totalInc:data.totals.inc,
				totalExp:data.totals.exp
			}
		},



		test:function(){
			console.log( data.totals['inc'])

			
		}
	}

	

})();



const view = (function (mod) {

	const DOMstrings = {
		inputType: '#add_type',
		inputDescription: '.input_description',
		inputValue: '.input_value',
		inputBtn: '.btn',
		incomeContainer:'.income_container',
		expenseContainer:'.expense_container'
	}

	const DOMinputs = {
		totalMoney: document.querySelector('#total_money'),
		date: document.querySelector('#budget-title-month'),
		income_display: document.querySelector('#income_display'),
		expense_display: document.querySelector('#expense_display'),

	}

	function month() {
		var month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";

		var d = new Date();
		var n = month[d.getMonth()];
		DOMinputs.date.innerHTML = n;

	}

	month();



	return {
		getInput: function () {
			return {
				totalMoney: document.querySelector('#total_money'),
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value,
				income_display: document.querySelector('#income_display'),
		        expense_display: document.querySelector('#expense_display')
			}
		},
		getDOMstring() {
			return DOMstrings;
		},
		clearFields: function(){
			let fields, fieldsArr;
			fields =  document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current,index,array){
				current.value = '';
			})

			fieldsArr[0].focus();
		}, 
		addListItem: function(obj,type){
			let html, newhtml,element;
			console.log(obj)

			//create html element and inject data from object based on type
			if(type == 'inc'){
				element = DOMstrings.incomeContainer;
				html = '<div id="income_list"><div id="income-%id%" class="item"><div class="item__description text-light">%description%</div><div class="right clearfix"><div class="item__value">$%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> </div>';
				

			}else if(type == 'exp'){
				element = DOMstrings.expenseContainer;
				html = '<div id="expense_list"><div id="expense-%id%" class="item"><div class="item__description text-light">%description%</div><div class="right clearfix"><div class="item__value text-danger">- $%value%</div><div class="item__percentage">10%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div></div>';
			}

			newhtml = html.replace('%id%',obj.id);
			newhtml = newhtml.replace('%description%',obj.description);
			newhtml = newhtml.replace('%value%',obj.value);

			document.querySelector(element).insertAdjacentHTML('beforeend',newhtml)
		}
		
		
	}

})();







const controller = (function (mod, view) {
	const DOM = view.getDOMstring();

	const setupEventListeners = () =>{
		document.querySelector('.btn').addEventListener('click', ctrlAddItem)
	
		document.addEventListener('keypress', function (e) {
			if (e.keyCode == 13 || e.which == 13) {
				ctrlAddItem();
			}
		})
	}

	

	let ctrlAddItem = function () {
		let input, newItem;
		sanitizeInput();

		// 1. Get the field input data
		input = view.getInput();
		// 2 Store inputs in item object
		newItem = model.addItem(input.type, input.description, input.value)
		// 3. Clear fields
		view.clearFields();
		// 4. Add Item to DOM
		view.addListItem(newItem,input.type);
		displayBudget();
		
	}

	let displayBudget = function(){
		mod.calculateBudget();
		let budget = mod.getBudget();
		let display = view.getInput();
		// document.querySelector('#income_display').innerHTML = budget.totalInc;
		display.expense_display.innerHTML = budget.totalExp;
		display.income_display.innerHTML = budget.totalInc;

		display.totalMoney.innerHTML = budget.total;
	
	}

	const sanitizeInput = () =>{
		let inputs = view.getInput();
	
		if(inputs.description == ''){
			inputs.description = "Default";
			console.log('description is working')
		}
		if(isNaN(inputs.value)){
			inputs.value = 3;
			console.log(inputs.value)
		}
	}


	

	return {
		init: function(){
			setupEventListeners();
			console.log('init is working')
		}
	}

})(model, view);

controller.init();