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
  		emitter.emit('save data')
  	})

  	emitter.on("sort meals array", function(newID) {
		if (state.meals[newID]["date"]) {
			var today = new Date()
			var newDate = state.meals[newID]["date"]
			if (newDate.date === today.date || newDate > today) {
				for (var i = 0; i < state.upcomingMeals.length; i++) {
					if (newDate < state.meals[state.upcomingMeals[i]]["date"]) {
						state.upcomingMeals.splice(i, 0, newID)
						return
					}
				}
				state.upcomingMeals.push(newID)
			} else {
				for (var i = 0; i < state.pastMeals.length; i++) {
					if (newDate < state.meals[state.pastMeals[i]]["date"]) {
						state.pastMeals.splice(i, 0, newID)
						return
					}
				}
				state.pastMeals.push(newID)
			}
		} else {
			if (state.alphaMealIDs.length === 0 ) {
				state.alphaMealIDs.push(newID)
			} else {
				var newName = state.meals[newID]["name"]
				for (var i = 0; i < state.alphaMealIDs.length; i++) {
					if (newName < state.meals[state.alphaMealIDs[i]]["name"]) {
						state.alphaMealIDs.splice(i, 0, newID)
						return
					}
				}
				state.alphaMealIDs.push(newID)
			}
		}
		emitter.emit('save data')
  	})

  	emitter.on('remove id', function(ar, id){
  		for (var i = 0; i < ar.length; i++) {
  			if (ar[i] === Number(id)) {
  				ar.splice(i, 1)
  			}
  		}
  	})

  	emitter.on('display meal', function(data){
  		state.mealDisplay['display'] = true
  		state.mealDisplay['id'] = data
  		emitter.emit(state.events.RENDER)
  	})  	

  	emitter.on('display person', function(data){
  		state.personDisplay['display'] = true
  		state.personDisplay['id'] = data
  		emitter.emit(state.events.RENDER)
  	})

  	emitter.on('edit guests', function(data){
  		state.editMealDisplay['display'] = true
  		state.editMealDisplay['id'] = data
  		emitter.emit(state.events.RENDER)
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
	    	state.datePicker.destroy()
			emitter.emit(state.events.RENDER)
	    })
	})

	emitter.on('DOMContentLoaded', function() {
		emitter.on('open meals view', function() {
			state.mealsView = 'visible'
			emitter.emit(state.events.RENDER)
		})
	})	

	emitter.on('DOMContentLoaded', function() {
		emitter.on('close meals view', function() {
			state.mealsView = 'invisible'
			state.editMealDisplay['display'] = false
			state.mealDisplay['display'] = false
			emitter.emit(state.events.RENDER)
		})
	})
	
	emitter.on('DOMContentLoaded', function() {
		emitter.on('open people view', function() {
			state.peopleView = 'visible'
			emitter.emit(state.events.RENDER)
		})
	})

	emitter.on('DOMContentLoaded', function() {
		emitter.on('close people view', function() {
			state.peopleView = 'invisible'
			emitter.emit(state.events.RENDER)
		})
	})

	emitter.on('close all views', function() {
		state.mealModal = 'invisible'
		state.personModal = 'invisible'
		state.peopleView = 'invisible'
		state.mealsView = 'invisible'
		state.mealDisplay['display'] = false
		state.personDisplay['display'] = false
		state.editMealDisplay['display'] = false
		if (state.datePicker) state.datePicker.destroy()
	})

	emitter.on('DOMContentLoaded', function () {
		emitter.on('row added', function () {
			emitter.emit(state.events.RENDER)
			emitter.emit('save data')
		})
	})
	emitter.on('DOMContentLoaded', function () {
		emitter.on('row removed', function () {
			emitter.emit(state.events.RENDER)
			emitter.emit('save data')
		})
	})
	emitter.on('DOMContentLoaded', function () {
	    emitter.on('person modal canceled', function () {
	    	state.personModal = 'invisible'
			emitter.emit(state.events.RENDER)
	    })
	})
	emitter.on('DOMContentLoaded', function () {
	    emitter.on('people complete', function () {
	    	state.personModal = 'invisible'
			emitter.emit(state.events.RENDER)
	    })
	})

	emitter.on('DOMContentLoaded', function () {
	    emitter.on('add meal modal', function (data) {
			state.mealModal = 'visible';
			state.meals[data] = {}
			state.meals[data]["members"] = []
			emitter.emit(state.events.RENDER, {component: "meal modal", id: data})
	    })
	})

	emitter.on('DOMContentLoaded', function () {
	    emitter.on('meal complete', function () {
	    	state.mealModal = 'invisible'
	    	state.datePicker.destroy()
			emitter.emit(state.events.RENDER)
	    })
	})

	emitter.on('DOMContentLoaded', function () {
	    emitter.on('meal modal canceled', function () {
	    	state.mealModal = 'invisible'
	    	state.datePicker.destroy()
			emitter.emit(state.events.RENDER)
	    })
	})

	emitter.on('close meal display', function() {
		state.mealDisplay['display'] = false
		emitter.emit(state.events.RENDER)
	})

	emitter.on('close person display', function() {
		state.personDisplay['display'] = false
		emitter.emit(state.events.RENDER)
		emitter.emit('save data')
	})

	emitter.on('save data', function() {
		var saveData = $.ajax({
			type: 'POST',
			url: "/enter-state",
			data: JSON.stringify({ 'state' : state }),
			contentType: "application/json",
			// success: function(resultData) { console.log("Save Complete") }
		});
		saveData.error(function(err) { console.log( err ); });
	})

	emitter.on('DOMContentLoaded', function() {
		$.get('/get-state', function(data, status) {
			if (data) {
				var redisState = JSON.parse(JSON.parse(data))
				state.redisState = redisState
				state.alphNameIDs = redisState.alphNameIDs
				state.alphaMealIDs = redisState.alphaMealIDs
				state.upcomingMeals = redisState.upcomingMeals
				state.pastMeals = redisState.pastMeals
				state.meals = redisState.meals
				state.mealsWDatesIDs = redisState.mealsWDatesIDs
				state.people = redisState.people
			}
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
				        	state.dateTest = this.getDate()
				        	state.momentTest = this.getMoment()
				       		state.meals[data["id"]]["date"]	= this.getDate()
				       		console.log(this.getMoment().format('Do MMMM YYYY'))
				        }
				    });

				    state.datePicker = datePicker

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
