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
  state.people = {0: {likes:["coffee", "tea"], dislikes:['peas', 'oranges'], restrictions:['dairy'], name:"a"}, 1: {likes:["carrots", "tea"], dislikes:['mash', 'oranges'], restrictions:['seafood', 'wheat', 'dairy'], name:"b"}}
  // state.people = {}
  state.alphNameIDs = [0,1]

  state.meals = {0: {members:[0,1], name: 'abc'}}
  state.mealsWDatesIDs = []
  state.alphaMealIDs = [0]

  state.personModal = 'invisible'
  state.mealModal = 'invisible'
  state.mealsView = 'invisible'
  state.peopleView = 'invisible'

  state.mealDisplay = {}
})

app.route('/', require('./views/main'))
app.route('/fig', require('./views/fig'))
// app.route('/*', require('./views/404'))

module.exports = app.mount('body')
