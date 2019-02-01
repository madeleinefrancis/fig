module.exports = store

function store (state, emitter) {
  state.totalClicks = 0

  emitter.on('DOMContentLoaded', function () {
    emitter.on('add person modal', function (data) {
		state.personModal = 'visible';
		state.people[data] = {}
		state.people[data]["likes"] = []
		state.people[data]["dislikes"] = []
		state.people[data]["restrictions"] = []
		emitter.emit(state.events.RENDER)
    })
  })
	emitter.on('DOMContentLoaded', function () {
	    emitter.on('modal canceled', function () {
			state.personModal = 'invisible';
			emitter.emit(state.events.RENDER)
	    })
  	})
  emitter.on('DOMContentLoaded', function () {
    emitter.on('row added', function () {
		emitter.emit(state.events.RENDER)
    })
  })
  emitter.on('DOMContentLoaded', function () {
    emitter.on('row removed', function () {
		emitter.emit(state.events.RENDER)
    })
  })
}
