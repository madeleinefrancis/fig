// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function (state, emit) {
  // create html template
  	return html`
        <div class="modal-wrapper ${state.mealsView}">  
            <input class="tab-input" id="tab-one" type="radio" name="grp" checked="checked"/>
            <label for="tab-one">Tab One</label>
            <div class="tab-input">
                A
            </div>
            
            <input class="tab-input" id="tab-two" type="radio" name="grp" />
            <label for="tab-two">Tab Two</label>
            <div class="tab-input">
                B
            </div>  
        </div>
  		`

	function datedMealRow (id) {
		var formatedDate = formatDate(id)
		return html`
			<div onclick=${displayMeal} mealID=${id}>
				${state.meals[id]["name"]}
			</div>
        <div class="deletable-list-column" mealID=${id} onclick=${deleteMeal}>
           X
        </div>
		`
	}

    function deleteMeal () {
        var mealID = event.target.getAttribute("mealID")
        removeDateFromList(mealID)
        delete state.meals[mealID]
        emit("row removed")
    }

    function removeDateFromList (id) {
        for (var i = 0; i < state.mealsWDatesIDs.length; i++) {
            if (state.mealsWDatesIDs[i] === Number(id)) {
                state.mealsWDatesIDs.splice(i, 1)
                return
            }
        }
        for (var i = 0; state.alphaMealIDs.length; i++) {
            if (state.alphaMealIDs[i] === Number(id)) {
                state.alphaMealIDs.splice(i, 1)
                return
            }
        }
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
		var mealID = event.target.getAttribute("mealID")
		emit('display meal', mealID)
	}
}
