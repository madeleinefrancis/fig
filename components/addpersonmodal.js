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
					<button id="complete-add-person" onclick=${complete}>
						done
					</button>
				</div>
	    	</div>

            <ul>
                <li id="tb_1" class="tabmenu active" content="content_1" onclick=${rudrSwitchTab}>Likes</li>
                <li id="tb_2" class="tabmenu" content="content_2" onclick=${rudrSwitchTab}>Disklikes</li>
                <li id="tb_3" class="tabmenu" content="content_3" onclick=${rudrSwitchTab}>Restriction</li>
            </ul>

	    	<div class="food-prefs">
	            <div id="content_1" class="tabcontent"> 
	            </div> 
	            <div id="content_2" class="tabcontent" style="display:none;">
	            </div>
	            <div id="content_3" class="tabcontent" style="display:none;">
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

	// use later for cancel button 
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

	function rudrSwitchTab(event) {
        // first of all we get all tab content blocks (I think the best way to get them by class names)
        var tab = event.target.getAttribute("id")
        var content = event.target.getAttribute("content")
        var x = document.getElementsByClassName("tabcontent");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = 'none'; // hide all tab content
        }
        document.getElementById(content).style.display = 'block'; // display the content of the tab we need
     
        // now we get all tab menu items by class names (use the next code only if you need to highlight current tab)
        var x = document.getElementsByClassName("tabmenu");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].className = 'tabmenu'; 
        }
        document.getElementById(tab).className = 'tabmenu active';
    }
}
