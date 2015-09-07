var vm = {
	foodLocations: ko.observableArray(foodPlaces.restaurant),
	query: ko.observable(''),
	search: function(value){
		//remove all the current locations, which removes them from the view
		vm.foodLocations.removeAll();

		if(value == '') return;

		for(var x in foodLocations){
			if (foodLocations[x].name.toLowerCase().indexOf(value.toLowerCase()) >=0) {
				vm.foodLocations.push(foodLocations[x]);
			}
		}
	}
};
vm.query.subscribe(vm.search);

ko.applyBindings(vm);
