var css = require('sheetify')
var choo = require('choo')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./stores/clicks'))
app.use(require('./stores/modals'))
app.use(function (state) {
  // initialize state
  state.people = {}
  state.alphNameIDs = []

  state.meals = {}
  state.mealsWDatesIDs = []
  state.alphaMealIDs = []

  state.personModal = 'invisible'
  state.mealModal = 'invisible'
  state.mealsView = 'invisible'
  state.peopleView = 'invisible'
})

app.route('/', require('./views/main'))
app.route('/fig', require('./views/fig'))
// app.route('/*', require('./views/404'))

module.exports = app.mount('body')
