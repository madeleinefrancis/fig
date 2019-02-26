// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function (state, emit) {
  // create html template
    var id = state.personDisplay['id']
    // findLikes()
    // findDislikes()
    // findRestrictions()

  	return html`
  		<div class="modal-wrapper person-display">
            <div class="display-meal-name">
                ${state.people[id] ? (state.people[id]["name"] ? showNameInput(true) : showNameInput(false)) : showNameInput(false)}
                <div onclick=${closePerson}>
                    done
                </div>
            </div>
            <div class="food-prefs">
                <div class="pref-column">
                    <div class="">
                        <input id="display-likes-input" placeholder="likes">
                        <button class="input-button" onclick=${addLike}> 
                            <i class="material-icons">
                                done
                            </i>
                        </button>
                    </div>
                    <div class="pref-list">
                        ${state.people[id] ? state.people[id]["likes"].slice(0).reverse().map( x => listRow(x, "likes")) : console.log("")}
                    </div>
                </div>
                <div class="pref-column">
                    <div class="">
                        <input id="display-dislikes-input" placeholder="dislikes">
                        <button class="input-button" onclick=${addDislike}> 
                            <i class="material-icons">
                                done
                            </i>
                        </button>
                    </div>
                    <div class="pref-list">
                        ${state.people[id] ? state.people[id]["dislikes"].slice(0).reverse().map( x => listRow(x, "dislikes")) : console.log("")}
                    </div>
                </div>
                <div class="pref-column">
                    <div class="">
                        <input id="display-restrictions-input" placeholder="restrictions">
                        <button class="input-button" onclick=${addRestriction}>     
                            <i class="material-icons">
                                done
                            </i>                    
                        </button>
                    </div>
                    <div class="pref-list">
                        ${state.people[id] ? state.people[id]["restrictions"].slice(0).reverse().map( x => listRow(x, "restrictions")) : console.log("")}
                    </div>
                </div>
            </div>
  		</div>
  		`

    function showNameInput(hasName) {
        return html
            `<div id="display-name-entry">
                <input id="display-name-input" placeholder="name" value=${hasName ? state.people[id]["name"] : ""}>
            </div>`
    }

    function checkForName() {
        var input = document.getElementById('display-name-input')
        if (input.value) {
            state.people[id]["name"] = input.value
        }
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

    function addLike() {``
        var input = document.getElementById('display-likes-input')
        var value = input.value
        if (value.length > 0) {
            checkForName()
            state.people[id]["likes"].push(value)
            emit("row added");
            input.value = ""
        }
    }
    
    function addDislike() {
        var input = document.getElementById('display-dislikes-input')
        var value = input.value
        if (value.length > 0) {
            checkForName()
            state.people[id]["dislikes"].push(value)
            emit("row added")
            input.value = ""
        }
    }
    
    function addRestriction() {
        var input = document.getElementById('display-restrictions-input')
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

    function closePerson() {
        var input = document.getElementById('display-name-input')
        if (!input.value) {
            alert("please add a name")
            return
        } else {
            if (input.value !== state.people[id]["name"]) {
                state.people[id]["name"] = input.value
                emit("sort people array", id, state.people[id]["name"])
            }
        }
        emit("close person display")
    }

}

