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
			total: 0
		},
		budget: 0,
		percentage: -1


	}


	return {
		addItem: function (type, des, val) {
			let newItem, ID;
			//Create new ID
			ID = data.allItems[type][data.allItems[type].length - 1] + 1;

			//Create conditional that seperates by type
			if (type == inc) {
				newItem = new Income(ID, des, val);
			} else if (type == exp) {
				newItem = new Expense(ID, des, val)
			}

			//store object in data allItems either inc or exp
			data.allItems[type].push(newItem);
			return newItem;

		},

		data:data
	}

	

})();



const view = (function (mod) {

	const DOMstrings = {
		inputType: '#add_type',
		inputDescription: '.input_description',
		inputValue: '.input_value',
		inputBtn: '.btn'
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
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				input: document.querySelector(DOMstrings.inputValue).value
			}
		},
		getDOMstring() {
			return DOMstrings;
		}

	}

})();







const controller = (function (mod, view) {
	const DOM = view.getDOMstring();

	const setupEventListeners = () =>{
		document.querySelector('.btn').addEventListener('click', function () {
			console.log('button is working')
		})
	
		document.addEventListener('keypress', function (e) {
			if (e.keyCode == 13 || e.which == 13) {
				console.log('enter button is working')
			}
		})
	}

	

	const update = () => {
		DOMinputs.income_display.innerHTML = mod.data.totals.inc;
		DOMinputs.expense_display.innerHTML = mod.data.totals.exp;
		DOMinputs.totalMoney.innerHTML = mod.data.totals.total;
	}

	let ctrlAddItem = function () {
		let input, newItem;

		// 1. Get the field input data
		input = view.getInput();
		// 2 Store inputs in item object
		newItem = addItem(input.type, input.description, input.value)
	}


	

	return {
		init: function(){
			setupEventListeners();
			console.log('init is working')
		}
	}

})(model, view);

controller.init();