var vm = {
	foodLocations: ko.observableArray(foodPlaces.restaurant.slice(0)),
	query: ko.observable(''),
	openInfo: function(entry){
		var holdIndex = foodPlaces.restaurant.indexOf(entry);
		google.maps.event.trigger(allMarkers[holdIndex], "click");
	},
	search: function(value){
		//remove all the current locations, which removes them from the view
		vm.foodLocations.removeAll();

		for(var x in foodPlaces.restaurant){
			if (foodPlaces.restaurant[x].title.toLowerCase().indexOf(value.toLowerCase()) >=0) {
				vm.foodLocations.push(foodPlaces.restaurant[x]);
			}
		}
	}
};

ko.applyBindings(vm);

vm.query.subscribe(vm.search);

