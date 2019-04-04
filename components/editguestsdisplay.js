var html = require('choo/html')

module.exports = function (state, emit) {
    var id = state.editGuestsDisplay['id'];

  	return html`
  		<div class="modal-wrapper edit-guests">
  			<div class="modal-content-wrapper">
  			</div>
  			<div id="members-column">
          ${state.alphNameIDs.map(listRow)}
  			</div>
  		</div>
  		`

	function listRow(member) {
        var inMeal = checkInMeal(member)
        if (inMeal) {
            return html`
                <div >
                    <div personID=${member}>
                        ${state.people[member]["name"]}
                    </div>
                    <div class="deletable-list-column" index=${member} onclick=${deletePerson}>
                        X
                    </div>
                </div>
                `
        } else {
            return html`
                <div >
                    <div personID=${member}>
                        ${state.people[member]["name"]}
                    </div>
                    <div class="deletable-list-column" index=${member} onclick=${addPerson}>
                        +
                    </div>
                </div>
                `
        }
	}

    function checkInMeal(member) {
        var mealMembers = state.meals[id]["members"]
        for (var i = 0; i < mealMembers.length; i++) {
            if (mealMembers[i]["name"] === state.people[member]["name"]) {
                return true
            }
        }
        return false
    }

    function deletePerson () {
        var personID = event.target.getAttribute("index");
        for (var i = 0; i < state.meals[id]["members"].length; i++) {
        	if (state.meals[id]["members"]["name"] === state.people[personID]["name"]) {
        		state.meals[id]["members"].splice(i, 1)
        	}
        }
        emit("row removed")
    }

    function addPerson () {
        var personID = event.target.getAttribute("index");
        state.meals[id]["members"].push(state.people[personID])
        emit("row removed")
    }

}

