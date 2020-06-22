const model = (function () {
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

	data = {
		total: 0,
		inc: 0,
		exp: 0
	}

	class Item {
		constructor(desc,val){
			this.desc = desc;
			this.val = val 
		}
	}


	const iphone = new Item('iphone X',322);

	console.log(iphone);


	return {
		DOMinputs: DOMinputs,
		data: data,
		item:Item
	}

})();



const view = (function (data, DOM) {

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
		DOM.date.innerHTML = n;
	}

	month();

	const update = () => {
		DOM.totalMoney.innerHTML = data.total;
		DOM.income_display.innerHTML = data.inc;
		DOM.expense_display.innerHTML = data.exp;
		DOM.totalMoney.innerHTML = data.total;
		}
	
	return {
		display:update
	}

})(model.data, model.DOMinputs);








const controller = (function (btn, input, data, type,display) {
	function calc() {
		if (type.value == "+") {
			data.inc = data.inc + parseInt(input.value);
			data.total = data.total + parseInt(input.value);
		} else if (type.value == "-") {
			data.exp = data.exp - parseInt(input.value);
			data.total = data.total - parseInt(input.value);
		}

		console.log(data.inc)
		console.log(data.exp)
		
	}

	function createItem(item){
		item 
	}


	btn.addEventListener('click', function () {
		calc();
		createItem(model.item);
		display();
		
		
	})

})(model.DOMinputs.calcBtn, model.DOMinputs.input, model.data, model.DOMinputs.type,view.display);

