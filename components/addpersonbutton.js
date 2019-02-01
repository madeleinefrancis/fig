// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function (state) {
  // create html template
  return html`
  <div class="inner-button" id="add-person-button">
    Add Person
  </div>
  `
}