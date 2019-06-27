// import choo's template helper
var html = require('choo/html')

module.exports = function (state, emit, id) {
  	return html`
	  <div class="modal-wrapper ${state.mealModal}">
	    <div class="modal-content-wrapper" id="meal-modal-content-wrapper">
	    	<div class="modal-name-input"> 
	    		${showNameInput()}
		    	<div id="date-container">
	    			<input type="text" class="datepicker" id="datepicker" autocomplete="off" placeholder="date">
		    	</div>
	    		<div id="complete-buttons">
					<button id="complete-add-person" onclick=${complete}>
						done
					</button>
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
	    	</div>`
	}

	function nameRow(name) {
		return html`
			<span>
				${name}
			</span>
		`
	}

	function listRow(content) {
		return html`
			<li class="list-row" index=${content}>
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

	function cancel() {
		delete state.meals[id]
		emit("meal modal canceled")
	}

	function complete() {
		var input = document.getElementById('meal-name-input')
		if (!input.value) {
			alert("please add a name")
			return
		}
		var value = input.value
		if (value.length > 0) {
			for (var key in state.meals) {
				if (state.meals[key]["name"] === value) {
					alert("a person with this name already exists")
					return
				}
			}
			state.meals[id]["name"] = value
		} 
		addMembers()
		emit("sort meals array", id)
		emit("meal complete")
	}

	function addMembers() {
		var listItems = $("#sortable1 li");
		listItems.each(function(i, li) {
			state.meals[id]["members"].push(state.people[li.getAttribute("index")])
		});
	}
}


