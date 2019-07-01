// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function (state, emit) {
  // create html template
  	return html`
        <div class="modal-wrapper ${state.mealsView}">
            <div class="modal-content-wrapper flex-stack">  
                <div class="tab-menu">
                    <div id="tb_1" class="tabmenu active" content="meal_content_1" onclick=${rudrSwitchTab}>Upcoming</div>
                    <div id="tb_2" class="tabmenu" content="meal_content_2" onclick=${rudrSwitchTab}>Past</div>
                </div>
                <div id="meal_content_1" class="tabcontent">
                    ${state.upcomingMeals.map(mealRow)}                     
                </div> 
                <div id="meal_content_2" class="tabcontent" style="display:none;">
                    ${state.pastMeals.map(mealRow)}
                </div>
            </div>
        </div>
  		`

	function mealRow (id) {
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

	function formatDate (id) {
		var date = state.meals[id]["date"]
	}

	function displayMeal () {
		var mealID = event.target.getAttribute("mealID")
		emit('display meal', mealID)
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
