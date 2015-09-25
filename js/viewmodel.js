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

		foodPlaces.restaurant.forEach(function(x){
			if (x.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
				vm.foodLocations.push(x);
				//place marker back on the map
				createMarker(x);
			}
		});
	}
};

ko.applyBindings(vm);

vm.query.subscribe(vm.search);

