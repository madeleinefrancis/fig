
var html = require('choo/html')
var addPerson = require('../components/addpersonbutton.js');
var addMeal = require('../components/addmealbutton.js');
var personModal = require('../components/addpersonmodal.js');

var TITLE = 'fig'

module.exports = fig

function fig(state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <body class="sans-serif pa3">
    	<div id="fig-wrapper">
	    	<link rel="stylesheet" href="assets/style.css" type="text/css">
	    	<div onclick=${addPersonModal}>
	    		${addPerson()}
	    	</div>
	    	<div onclick=${addMealModal}>
	    		${addMeal()}
	    	</div>
	    	<div>
	    		${personModal(state, emit, Object.keys(state.people).length - 1)}
	    	</div>
	    </div>
    </body>
  `
	function addPersonModal () {
		emit('add person modal', Object.keys(state.people).length)
	}
	function addMealModal () {
    	emit('add meal modal')
  }
}
