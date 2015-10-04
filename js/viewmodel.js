var vm = {
	foodLocations: ko.observableArray(foodPlaces.restaurant.slice(0)),
	query: ko.observable(''),
	//click method triggers click even on markers
	openInfo: function(entry){
		var holdIndex = foodPlaces.restaurant.indexOf(entry);
		google.maps.event.trigger(allMarkers[holdIndex], "click");
	},
	search: function(value){
		//remove all the current locations, which removes them from the view
		vm.foodLocations.removeAll();

		//remove markers from map
		clearMarkers();

		foodPlaces.restaurant.forEach(function(place){
			if (place.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
				vm.foodLocations.push(place);
				//place marker back on the map
				createMarker(place);
			}
		});
	}
};

/*viewmodel is loaded last, check to see if google api is defined. 
If not, display error message, else, apply bindings*/
if (typeof google === 'undefined') {
	$('#map').append("<br><h1><p>Unfortunately, Google Maps is not working and project will not load.</p></h1>");
	$("#map").append("<br><h1><p>Please verify api connection.</p></h1>");
} else {
	ko.applyBindings(vm);
	vm.query.subscribe(vm.search);
}