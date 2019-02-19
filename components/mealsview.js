// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function (state, emit) {
  // create html template
  	return html`
  		<div class="modal-wrapper ${state.mealsView}">
  			<div class="modal-content-wrapper">
  				MEALS
  			</div>
  			<div id="meal-columns-wrapper">
	  			<div id="member-columns">
		    		<div class="column">
		  				<div id="dated-meals" class="meal-column">
		  					${state.mealsWDatesIDs.map(datedMealRow)}
		  				</div>
		    		</div>
		    		<div class="column">
		  				<div id="non-dated-meals" class="meal-column">
		  					${state.alphaMealIDs.map(datedMealRow)}
		  				</div>
		    		</div>
		    	</div>
  			</div>
  		</div>
  		`

  		function datedMealRow (id) {
  			var formatedDate = formatDate(id)
  			return html`
  				<div onclick=${displayMeal} mealID=${id}>
  					${state.meals[id]["name"]}
  				</div>
  			`
  		}

  		function mealRow (id) {
  			return html`
  				<div>
  					${state.meals[id]["name"]}
  				</div>
  			`
  		}

  		function formatDate (id) {
  			var date = state.meals[id]["date"]
  		}

  		function displayMeal () {
  			var id = event.target.getAttribute("mealID")
  			emit('display meal', id)
  		}
}

