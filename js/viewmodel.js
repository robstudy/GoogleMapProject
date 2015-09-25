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
		clearMarkers();
		for(var x in foodPlaces.restaurant){
			if (foodPlaces.restaurant[x].title.toLowerCase().indexOf(value.toLowerCase()) >=0) {
				vm.foodLocations.push(foodPlaces.restaurant[x]);
				//push restaurant back into allMarkers array by calling createMarker
				createMarker(foodPlaces.restaurant[x]);
			}
		}
	}
};

ko.applyBindings(vm);

vm.query.subscribe(vm.search);

