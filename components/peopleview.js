// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function (state, emit) {
  // create html template
  	return html`
  		<div class="modal-wrapper ${state.peopleView}">
  			<div class="modal-content-wrapper">
  				PEOPLE
  			</div>
  			<div id="meal-columns-wrapper">
	  			<div id="member-columns">
	  				${state.alphNameIDs.map(listRow)}
		    	</div>
  			</div>
  		</div>
  		`

	function listRow(content) {
		return html`
			<li class="list-row">
				<div personID=${content} onclick=${displayPerson}>
					${state.people[content]["name"]}
				</div>
                <div class="deletable-list-column" id=${content} onclick=${deletePerson}>
                    X
                </div>
			</li>
			`
	}

    function deletePerson () {
        var personID = event.target.getAttribute("id");
        delete state.people[personID]
        for (var i = 0; i < state.alphNameIDs.length; i++) {
        	if (state.alphNameIDs[i] === Number(personID)) {
        		state.alphNameIDs.splice(i, 1)
        	}
        }
        emit("row removed")
    }

	function displayPerson () {
		var id = event.target.getAttribute("personID")
		emit('display person', id)
	}
}

