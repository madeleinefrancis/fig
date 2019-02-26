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
            <div class="display-meal-name">
                ${state.meals[id]['name']}
                <div onclick=${closeMeal}>
                    x
                </div>
            </div>
            <div class="display-meal-columns">
                <div class="display-meal-column">
                    <div class="meal-column-title">
                        Guests
                    </div>
                    <div class="meal-column-items">
                        ${state.meals[id]['members'] ? state.meals[id]['members'].map(memberRow) : console.log("")}
                    </div>
                </div>
                <div class="display-meal-column">
                    <div class="meal-column-title">
                        Shared Likes
                    </div>
                    <div class="meal-column-items">
                        ${state.meals[id]['alphLikes'].map(row)}
                    </div>
                </div>
                <div class="display-meal-column">
                    <div class="meal-column-title">
                        Shared Dislikes
                    </div>
                    <div class="meal-column-items">
                        ${state.meals[id]['alphDislikes'].map(row)}
                    </div>
                </div>
                <div class="display-meal-column">
                    <div class="meal-column-title">
                        Shared Restrictions
                    </div>
                    <div class="meal-column-items">
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
}

