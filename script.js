const model = (function(){
		DOMinputs = {
			date: document.querySelector('#total_money'),
			income_display: document.querySelector('#income_display'),
			expense_display: document.querySelector('#expense_display'),
			type: document.querySelector('select').value,
			description: document.querySelector('#input_description'),
			input: document.querySelector('#input_value'),
			calcBtn = document.querySelector('button')
		}
		data = {
			total: 0,
			inc: 0,
			exp: 0
		}

		return {
			DOMinputs: DOMinputs,
			data: data
		}
		
})();



const view = (function(data,DOM){
	DOM.total.innerHTML = data.total;
	DOM.income_display.innerHTML = data.inc;
	DOM.expense_display.innerHTML = data.inc;
})(data,DOMinputs);


const controller = (function(btn,input,data,type){
	function calc(){
		if(type == "+"){
			data.total = data.total + input;
		}else if(type == "-"){
			data.total = data.total - input;
		}
	}


	btn.addEventListener('click',function(){
		calc();
	})
	
})(model.DOMinputs.calcBtn, model.DOMinputs.input, model.data,model.DOMinputs.type);