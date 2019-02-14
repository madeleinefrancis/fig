
var html = require('choo/html')
var addPerson = require('../components/addpersonbutton.js');
var addMeal = require('../components/addmealbutton.js');
var personModal = require('../components/addpersonmodal.js');
var mealModal = require('../components/addmealmodal.js');
var mealsButton = require('../components/mealsbutton.js');
var peopleButton = require('../components/peoplebutton.js');

var TITLE = 'fig'

module.exports = fig

function fig(state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <body class="sans-serif pa3">
    	<div id="fig-wrapper">
	    	<link rel="stylesheet" href="assets/style.css" type="text/css">
	    	<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      		rel="stylesheet">
			<script src="https://cdn.jsdelivr.net/npm/pikaday/pikaday.js"></script>
			<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.css">
			<script src="assets/pikaday/pikaday.js"></script>
			<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  			<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	    	<div onclick=${addPersonModal}>
	    		${addPerson()}
	    	</div>
	    	<div onclick=${addMealModal}>
	    		${addMeal()}
	    	</div>
	    	<div onclick=${showMeals}>
	    		${mealsButton()}
	    	</div>
	    	<div onclick=${showPeople}>
	    		${peopleButton()}
	    	</div>
	    	<div>
	    		${personModal(state, emit, Object.keys(state.people).length - 1)}
	    	</div>
	    	<div>
	    		${mealModal(state, emit, Object.keys(state.meals).length - 1)}
	    	</div>
	    </div>
    </body>
  `
	function addPersonModal() {
		if (state.personModal === 'invisible') {
			emit('add person modal', Object.keys(state.people).length)
		} else {
			emit('close person modal')
		}

		if (state.mealModal === 'visible') {
			emit('close meal modal')
		}
	}
	function addMealModal() {
		if (state.mealModal === 'invisible') {
    		emit('add meal modal', Object.keys(state.meals).length)
		} else {
			emit('close meal modal')
		}

		if (state.personModal === 'visible') {
			emit('close person modal')
		}
	}
	function showMeals() {

	}
	function showPeople() {

	}
}
