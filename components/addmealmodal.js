// import choo's template helper
var html = require('choo/html')

module.exports = function (state, emit, id) {
  	return html`
	  <div class="modal-wrapper ${state.mealModal}">
	    <div class="modal-content-wrapper" id="meal-modal-content-wrapper">
	    	<div class="modal-name-input"> 
	    		<div id="complete-buttons">
		    		<button id="cancel-add-person" onclick=${cancel}>
		    			cancel
		    		</button>
					<button id="complete-add-person" onclick=${complete}>
						done
					</button>
				</div>
	    		${state.meals[id] ? (state.meals[id]["name"] ? listRow(state.meals[id]["name"]) : showNameInput()) : showNameInput()}
	    		</button>
	    		<button class="input-button" onclick=${addName}> 
	    			<i class="material-icons">
						done
					</i>
	    		</button>
		    	<div id="date-container">
	    			<input type="text" class="datepicker" id="datepicker">
		    	</div>
	    	</div>	
	    	<div id="member-columns">
	    		<div class="column" id="meal-members-column">
	    			Guests
	    			<ul class="connectedSortable" id="sortable1">
	    			</ul>
	    		</div>
	    		<div class="column" id="all-members-column">
	    			<ul class="connectedSortable" id="sortable2">
	    				${state.alphNameIDs.map(listRow)}
	    			</ul>
	    		</div>
	    	</div>
	    </div>
	  </div>
	  `

	function showNameInput() {
  		return html
			`<div id="meal-name-entry">
	    		<input id="meal-name-input" placeholder="name">
	    		<button class="input-button" onclick=${addName}> 
	    	</div>`
	}

	function listRow(content) {
		return html`
			<li class="list-row">
				${state.people[content]["name"]}
			</li>
			`
	}

	function deleteItem(event) {
		var column = event.target.getAttribute("column")
		var content = event.target.getAttribute("content")
		delete state.meals[id].name
		emit("row removed")
	}

	function personRow(name) {
		return html
		`<div class="person-row">
			${name}
		</div>
		`
	}

	function addName() {
  		var input = document.getElementById('meal-name-input')
		var value = input.value
		if (value.length > 0) {
			for (var key in state.meals) {
				if (state.meals[key]["name"] === value) {
					alert("a person with this name already exists")
					return
				}
			}
			state.meals[id]["name"] = value
			// DIFFERENT STYLING FOR SET NAME
			emit("row added")
			input.value = ""
		}
	}

	function cancel() {
		delete state.meals[id]
		emit("meal modal canceled")
	}

	function complete() {
		if (!state.meals[id]["name"]) {
			alert("please add a name")
			return
		} 
		addMembers()
		emit("meal complete")
	}

	function addMembers() {
		var listItems = $("#sortable1 li");
		listItems.each(function(i, li) {
			console.log(li.innerHTML);
		});
	}
}


