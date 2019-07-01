// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function (state, emit) {
  // create html template
    var id = state.mealDisplay['id']
    findLikes()
    findDislikes()
    findRestrictions()

  	return html`
  		<div class="modal-wrapper meal-display">
            <div class="modal-content-wrapper flex-stack">
                <div id="complete-meal-display-button">
                        <button>
                            <i class="material-icons">
                                close
                            </i>
                        </button>
                </div>
                <div id="edit-meal-display-button">
                    <button>
                        <i class="material-icons" onclick=${editMembers}>
                            edit
                        </i>
                    </button>
                </div>
                <div class="display-meal-name">
                    ${state.meals[id]['name']}
                </div>
                <div class="tab-menu">
                    <div id="meal_view_tb_1" class="tabmenu active" content="meal_view_content_1" onclick=${rudrSwitchTab}>shared likes</div>
                    <div id="meal_view_tb_2" class="tabmenu" content="meal_view_content_2" onclick=${rudrSwitchTab}>shared dislikes</div>
                    <div id="meal_view_tb_3" class="tabmenu" content="meal_view_content_3" onclick=${rudrSwitchTab}>shared restrictions</div>
                </div>   

                <div class="meals-view-content">
                    <div id="meal_view_content_1" class="tabcontent">   
                        ${state.meals[id]['alphLikes'].map(row)}                 
                    </div> 
                    <div id="meal_view_content_2" class="tabcontent" style="display:none;">
                        ${state.meals[id]['alphDislikes'].map(row)}
                    </div>
                    <div id="meal_view_content_3" class="tabcontent" style="display:none;">
                        ${state.meals[id]['alphRestrictions'].map(row)}
                    </div>
                </div>                 
            </div>
  		</div>
  		`

    function closeMeal () {
        emit('close meal display')
    }

    function memberRow (memberRow) {
        return html`
            <div class="deletable-list">
                <div class="deletable-list-column">
                    ${memberRow['name']}
                </div>
                <div class="deletable-list-column" name=${memberRow["name"]} onclick=${deleteMember}>
                    X
                </div>
            </div>
        `
    }

    function deleteMember () {
        var memberName = event.target.getAttribute("name");
        for (var i = 0; i < state.meals[id]["members"].length; i++) {
            var curMember = state.meals[id]["members"][i]
            if (curMember["name"] === memberName) {
                state.meals[id]["members"].splice(i, 1)
                emit("row added")
                break
            }
        }
        emit('save data')
    }

    function editMembers () {
        emit('edit guests', id)
    }

    function row (content) {
        return html`
            <div>
                ${content}
            </div>
        `
    }

    function findLikes () {
        var likesList = {}
        var alphLikes = []
        for (var i = 0; i < state.meals[id]['members'].length; i++) {   
            var person = state.meals[id]['members'][i]
            var likes = person['likes']
            for (var j = 0; j < likes.length; j++) {
                if (likes[j] in likesList) {
                    likesList[likes[j]].push(state.meals[id]['members'][i])
                } else {
                    likesList[likes[j]] = {}
                    likesList[likes[j]] = []
                    likesList[likes[j]].push(state.meals[id]['members'][i])
                    alphLikes.push(likes[j])
                }
            }
        }
        state.meals[id]['alphLikes'] = alphLikes.sort()
        state.meals[id]['likesList'] = likesList
    }

    function findDislikes () {
        var dislikesList = {}
        var alphDislikes = []
        for (var i = 0; i < state.meals[id]['members'].length; i++) {
            var person = state.meals[id]['members'][i]
            var dislikes = person['dislikes']
            for (var j = 0; j < dislikes.length; j++) {
                if (dislikes[j] in dislikesList) {
                    dislikesList[dislikes[j]].push(state.meals[id]['members'][i])
                } else {
                    dislikesList[dislikes[j]] = {}
                    dislikesList[dislikes[j]] = []
                    dislikesList[dislikes[j]].push(state.meals[id]['members'][i])
                    alphDislikes.push(dislikes[j])
                }
            }
        }
        state.meals[id]['alphDislikes'] = alphDislikes
        state.meals[id]['dislikesList'] = dislikesList
    }

    function findRestrictions () {
        var restrictionsList = {}
        var alphRestrictions = []
        for (var i = 0; i < state.meals[id]['members'].length; i++) {
            var person = state.meals[id]['members'][i]
            var restrictions = person['restrictions']
            for (var j = 0; j < restrictions.length; j++) {
                if (restrictions[j] in restrictionsList) {
                    restrictionsList[restrictions[j]].push(state.meals[id]['members'][i])
                } else {
                    restrictionsList[restrictions[j]] = {}
                    restrictionsList[restrictions[j]] = []
                    restrictionsList[restrictions[j]].push(state.meals[id]['members'][i])
                    alphRestrictions.push(restrictions[j])
                }
            }
        }
        state.meals[id]['restrictionsList'] = restrictionsList
        state.meals[id]['alphRestrictions'] = alphRestrictions
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

