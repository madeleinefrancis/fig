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

  	emitter.on("sort people array", function(newID, newName) {
  		if (state.alphNameIDs.length === 0 ) {
  			state.alphNameIDs.push(newID)
  		} else {
	  		for (var i = 0; i < state.alphNameIDs.length; i++ ) {
	  			if (newName < state.people[state.alphNameIDs[i]]["name"]) {
					  state.alphNameIDs.splice(i, 0, newID)
		              return
		        }
	  		}
	  		state.alphNameIDs.push(newID) 
  		}
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
		if (data) {
			if (data["component"] === "meal modal") {
				setTimeout( function() {
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

			    	$('#sortable1, #sortable2').sortable({
						helper: "clone",
						placeholder: "selected-option",
						forcePlaceholderSize: true,
						dropOnEmpty: true,
						revert: true,
						connectWith: '.connectedSortable',
						tolerance: "pointer",
						cursor: "move",
						beforeStop: function (event, ui) {
							if($(ui.helper).parent().attr('id') === 'sortable2' && $(ui.placeholder).parent().attr('id') === 'sortable2')
								return false; 
						}
					});		

				}, 1000)
			}
		}
	})
}
