var html = require('choo/html')
var addPerson = require('../components/addpersonbutton.js');
var addMeal = require('../components/addmealbutton.js');
var personModal = require('../components/addpersonmodal.js');
var mealModal = require('../components/addmealmodal.js');
var mealsButton = require('../components/mealsbutton.js');
var peopleButton = require('../components/peoplebutton.js');
var mealsView = require('../components/mealsview.js');
var peopleView = require('../components/peopleview.js');
var mealDisplay = require('../components/mealdisplay.js');
var personDisplay = require('../components/persondisplay.js');
var editGuestsDisplay = require('../components/editguestsdisplay.js');

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
  			<script src="assets/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"></script>
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
	    	<div>
	    		${mealsView(state, emit)}
	    	</div>
	    	<div>
	    		${peopleView(state, emit)}
	    	</div>
	    	<div>
	    		${state.mealDisplay['display'] ? mealDisplay(state, emit) : console.log('')}
	    	</div>
	    	<div>
	    		${state.personDisplay['display'] ? personDisplay(state, emit) : console.log('')}
	    	</div>
	    	<div>
	    		${state.editGuestsDisplay['display'] ? editGuestsDisplay(state, emit) : console.log('')}
	    	</div>
	    </div>
    </body>
  `

	function addPersonModal() {
		if (state.personModal === 'invisible') {
			emit('close all views')
			emit('add person modal', Object.keys(state.people).length)
		} else {
			emit('close person modal')
		}
	}

	function addMealModal() {
		if (state.mealModal === 'invisible') {
			emit('close all views')
    		emit('add meal modal', Object.keys(state.meals).length)
		} else {
			emit('close meal modal')
		}
	}

	function showMeals() {
		if (state.mealsView === 'invisible') {
			emit('close all views')
			emit("open meals view")
		} else {
			emit('close meals view')
		}
	}

	function showPeople() {
		if (state.peopleView === 'invisible') {
			emit('close all views')
			emit("open people view")
		} else {
			emit("close people view")
		}
	}
}
