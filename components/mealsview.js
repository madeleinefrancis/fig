// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function (state, emit) {
  // create html template
  	return html`
  		<div class="modal-wrapper ${state.mealsView}">
  			<ul>
          <li onclick=${switchTab} id="tb_1" index="1" class="tabmenu active">Tab 1</li>
          <li onclick=${switchTab} id="tb_2" index="2" class="tabmenu">Tab 2</li>
        </ul>
         
        <div id="content_1" index="1" class="tabcontent"> 
          Content of the first tab.
        </div> 
        <div id="content_2" index="2" class="tabcontent" style="display:none;">
          Content of the second tab.
        </div>
  		</div>
  		`

      function switchTab(event) {
        // first of all we get all tab content blocks (I think the best way to get them by class names)
        var tabID = event.target.getAttribute("id")
        var tabIndex = event.target.getAttribute("index")
        var x = document.getElementsByClassName("tabcontent");
        var i;
        for (i = 0; i < x.length; i++) {
          x[i].style.display = 'none'; // hide all tab content
        }
        var contentID = "content_" + tabIndex
        document.getElementById(contentID).style.display = 'block'; // display the content of the tab we need
       
        // now we get all tab menu items by class names (use the next code only if you need to highlight current tab)
        var x = document.getElementsByClassName("tabmenu");
        var i;
        for (i = 0; i < x.length; i++) {
          x[i].className = 'tabmenu'; 
        }
        document.getElementById(tabID).className = 'tabmenu active';
      }

  		function datedMealRow (id) {
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

  		function mealRow (id) {
  			return html`
  				<div>
  					${state.meals[id]["name"]}
  				</div>
  			`
  		}

  		function formatDate (id) {
  			var date = state.meals[id]["date"]
  		}

  		function displayMeal () {
  			var mealID = event.target.getAttribute("mealID")
  			emit('display meal', mealID)
  		}
}

// <div class="modal-content-wrapper">
//           MEALS
//         </div>
//         <div id="meal-columns-wrapper">
//           <div id="member-columns">
//             <div class="column">
//               <div id="dated-meals" class="meal-column">
//                 ${state.mealsWDatesIDs.map(datedMealRow)}
//               </div>
//             </div>
//             <div class="column">
//               <div id="non-dated-meals" class="meal-column">
//                 ${state.alphaMealIDs.map(datedMealRow)}
//               </div>
//             </div>
//           </div>
//         </div>

