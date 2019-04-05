// import choo's template helper
var html = require('choo/html')

module.exports = function (state, emit, id) {
  	return html`
	  <div class="modal-wrapper ${state.personModal}">
	    <div class="modal-content-wrapper">
	    	<div class="modal-name-input"> 
	    		${state.people[id] ? (state.people[id]["name"] ? showNameInput(true) : showNameInput(false)) : showNameInput(false)}
	    		</button>
	    		<div id="complete-buttons">
		    		<button id="cancel-add-person" onclick=${cancel}>
		    			cancel
		    		</button>
					<button id="complete-add-person" onclick=${complete}>
						done
					</button>
				</div>
	    	</div>
	    	<div class="food-prefs">
		    	<div class="pref-column">
		    		<div class="">
			    		<input id="likes-input" placeholder="likes">
			    		<button class="input-button" onclick=${addLike}> 
			    			<i class="material-icons">
								done
							</i>
			    		</button>
		    		</div>
		    		<div class="pref-list">
		    			${state.people[id] ? state.people[id]["likes"].slice(0).reverse().map( x => listRow(x, "likes")) : null}
		    		</div>
	    		</div>
		    	<div class="pref-column">
		    		<div class="">
			    		<input id="dislikes-input" placeholder="dislikes">
			    		<button class="input-button" onclick=${addDislike}> 
			    			<i class="material-icons">
								done
							</i>
			    		</button>
		    		</div>
		    		<div class="pref-list">
		    			${state.people[id] ? state.people[id]["dislikes"].slice(0).reverse().map( x => listRow(x, "dislikes")) : null}
		    		</div>
	    		</div>
		    	<div class="pref-column">
		    		<div class="">
						<input id="restrictions-input" placeholder="restrictions">
			    		<button class="input-button" onclick=${addRestriction}> 	
			    			<i class="material-icons">
								done
							</i>	    			
			    		</button>
		    		</div>
		    		<div class="pref-list">
		    			${state.people[id] ? state.people[id]["restrictions"].slice(0).reverse().map( x => listRow(x, "restrictions")) : null}
		    		</div>
	    		</div>
	    	</div>
	    </div>
	  </div>
	  `

	function showNameInput(hasName) {
		return html
			`<div id="name-entry">
	    		<input id="name-input" placeholder="name" value=${hasName ? state.people[id]["name"] : ""}>
	    	</div>`
	}

	function listRow(content, column) {
		return html`
		<div onclick=${deleteItem}>	
		  <span class="list-row">
			${content}
		  </span>
		  <span column=${column} content=${content}>
		  	x
		  </span>
		</div>
		  `
	}

	function checkForName() {
		var input = document.getElementById('name-input')
		if (input.value) {
			state.people[id]["name"] = input.value
		}
	}

	function deleteItem(event) {
		var column = event.target.getAttribute("column")
		var content = event.target.getAttribute("content")
		if (column === "name") {
			delete state.people[id].name
			emit("row removed")
		} else {
			if (column === "likes") {
				var index = state.people[id].likes.indexOf(content)
				if (index > -1) state.people[id].likes.splice(index, 1)
			} else if (column === "dislikes"){
				var index = state.people[id].dislikes.indexOf(content)
				if (index > -1) state.people[id].dislikes.splice(index, 1)
			} else {
				var index = state.people[id].restrictions.indexOf(content)
				if (index > -1) state.people[id].restrictions.splice(index, 1)
			}
			emit("row removed")
		}
	}

	function addPref(type) {
		var input = document.getElementById(type + "-input")
		var value = input.value
		if (value.length > 0) {
			checkForName()
			state.people[id][type] = value
			emit("row added")
			input.value = ""
		}
	}

	function addLike() {
		var input = document.getElementById('likes-input')
		var value = input.value
		if (value.length > 0) {
			checkForName()
			state.people[id]["likes"].push(value)
			emit("row added");
			input.value = ""
		}
	}
	
	function addDislike() {
		var input = document.getElementById('dislikes-input')
		var value = input.value
		if (value.length > 0) {
			checkForName()
			state.people[id]["dislikes"].push(value)
			emit("row added")
			input.value = ""
		}
	}
	
	function addRestriction() {
		var input = document.getElementById('restrictions-input')
		var value = input.value
		if (value.length > 0) {
			checkForName()
			state.people[id]["restrictions"].push(value)
			emit("row added")
			input.value = ""
		}
	}

	function cancel() {
		delete state.people[id]
		emit("person modal canceled")
	}

	function complete() {
		var input = document.getElementById('name-input')
		if (!input.value) {
			alert("please add a name")
			return
		} else {
			state.people[id]["name"] = input.value
		}
		emit("sort people array", id, state.people[id]["name"])
		emit("close person modal")
	}
}
