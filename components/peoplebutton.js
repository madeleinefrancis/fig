// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function () {
  // create html template
  return html`	
  <div class="inner-button" id="people-button">
    People
  </div>
  `
}