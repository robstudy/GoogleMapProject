var map;
function initMap(){

	var locations;

	//location information
	function locationInformation(){
		var locations = [];

		for (var spots in foodPlaces.restaurant){
			locations.push(foodPlaces.restaurant[spots].location);
		}
		console.log(locations);
		return locations;
	}

	//Map initial location
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 36.8253, lng: -119.7031},
		zoom: 12
	});

	//Markers
	function addMarkers(){
		for (var spots in foodPlaces.restaurant){
			var marker = new google.maps.Marker({
				animation: google.maps.Animation.DROP,
				position: {lat: foodPlaces.restaurant[spots].lat, lng: foodPlaces.restaurant[spots].lng},
				title: foodPlaces.restaurant[spots].title
			});
			marker.setMap(map);
		}
	}

	locations = locationInformation();
	addMarkers();
};


//solution https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);