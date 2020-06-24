const model = (function () {

	let Expense = function(id,description,value){
		this.id = id;
		this.description = description;
		this.value = value;
	}

	let Income = function(id,description,value){
		this.id = id;
		this.description = description;
		this.value = value;
	}

	let data = {
		allItems:{
			exp: [],
			inc: []
		},
		totals: {
			inc: 0,
			exp: 0,
			total:0
		},
		budget: 0,
		percentage: -1
		
		
	}

	const iphone = new Expense('iphone X',322);

	console.log(iphone);


	return {
		addItem: function(type,des,val){
			let newItem;
			//Create new ID
			
			//Create conditional that seperates by type
			if(type == inc){
				newItem = new Income(des,val);
			}else if(type == exp){
				newItem = new Expense(des,val)
			}
			//Create new object either inc or exp based on type

			//store object in data allItems either inc or exp

			}
		},

		data: data,
		
	}

})();



const view = (function (mod) {

	DOMinputs = {
		totalMoney:document.querySelector('#total_money'),
		date: document.querySelector('#budget-title-month'),
		income_display: document.querySelector('#income_display'),
		expense_display: document.querySelector('#expense_display'),
		type: document.querySelector('#add_type'),
		description: document.querySelector('#input_description'),
		input: document.querySelector('.input_value'),
		calcBtn: document.querySelector('button')
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
		this.DOMinputs.date.innerHTML = n;
		
	}

	month();

	
	
	return {
		DOMinputs: DOMinputs,
		
	}

})();







const controller = (function (mod,view) {
	function calc() {
		if (view.DOMinputs.type.value == "+") {
			model.data.totals.inc = model.data.totals.inc + parseInt(view.DOMinputs.input.value);
			model.data.totals.total = model.data.totals.total + parseInt(view.DOMinputs.input.value);
		} else if (view.DOMinputs.type.value == "-") {
			view.data.totals.total = view.data.totals.exp - parseInt(view.DOMinputs.input.value);
			view.data.totals,total = view.data.totals.total - parseInt(view.DOMinputs.input.value);
		}
model.data.totals.total
		console.log(model.data.totals.inc)
		console.log(model.data.totals.exp)
		
	}

	const update = () => {
		DOMinputs.income_display.innerHTML = mod.data.totals.inc;
		DOMinputs.expense_display.innerHTML = mod.data.totals.exp;
		DOMinputs.totalMoney.innerHTML = mod.data.totals.total;
		}

	let ctrlAddItem = function(){
		let input, newItem;

		// 1. Get the field input data
		
		// 2 Store inputs in item object

		// 3. Save item in either inc or exp array in data
	}


	view.DOMinputs.calcBtn.addEventListener('click', function () {
		calc();
		update();
		
		
	})


})(model,view);

