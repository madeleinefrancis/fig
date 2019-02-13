// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function () {
  // create html template
  return html`	
  <div class="inner-button" id="meals-button">
    Meals
  </div>
  `
}