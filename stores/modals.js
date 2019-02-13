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
	    emitter.on('close person modal', function () {
	    	state.personModal = 'invisible'
			emitter.emit(state.events.RENDER)
	    })
	})

	emitter.on('DOMContentLoaded', function () {
	    emitter.on('close meal modal', function () {
	    	state.mealModal = 'invisible'
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
	emitter.on('DOMContentLoaded', function () {
	    emitter.on('person modal canceled', function () {
	    	state.personModal = 'invisible'
			emitter.emit(state.events.RENDER)
	    })
	})
	emitter.on('DOMContentLoaded', function () {
	    emitter.on('person complete', function () {
	    	state.personModal = 'invisible'
			emitter.emit(state.events.RENDER)
	    })
	})

	emitter.on('DOMContentLoaded', function () {
	    emitter.on('add meal modal', function (data) {
			state.mealModal = 'visible';
			state.meals[data] = {}
			state.meals[data]["members"] = {}
			emitter.emit(state.events.RENDER, {component: "meal modal", id: data})
	    })
	})

	emitter.on('DOMContentLoaded', function () {
	    emitter.on('meal complete', function () {
	    	state.mealModal = 'invisible'
			emitter.emit(state.events.RENDER)
	    })
	})

	emitter.on('DOMContentLoaded', function () {
	    emitter.on('meal modal canceled', function () {
	    	state.mealModal = 'invisible'
			emitter.emit(state.events.RENDER)
	    })
	})

	emitter.on('render', function(data) {
		setTimeout(function() {
			var datePicker = new Pikaday(
		    {
		        field: document.getElementById('datepicker'),
		        firstDay: 1,
		        minDate: new Date(),
		        maxDate: new Date(2020, 12, 31),
		        yearRange: [2019,2020],
		        onSelect: function() {
		       		state.meals[data["id"]]["date"]	= this.getDate()
		        }
		    });
		}, 1000)
	})
}
