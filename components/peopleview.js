// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function (state) {
  // create html template
  	return html`
  		<div class="modal-wrapper ${state.peopleView}">
  			<div class="modal-content-wrapper">
  				PEOPLE
  			</div>
  		</div>
  	`
}