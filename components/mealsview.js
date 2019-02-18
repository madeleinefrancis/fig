// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function (state) {
  // create html template
  	return html`
  		<div class="modal-wrapper ${state.mealsView}">
  			<div class="modal-content-wrapper">
  				MEALS
  			</div>
  		</div>
  	`
}