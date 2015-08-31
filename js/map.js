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
	var marker = new google.maps.Marker({
		animation: google.maps.Animation.DROP,
		position: {lat: 36.8362263, lng: -119.699005},
		title: 'Ooi Sushi'
	});
	marker.addListener('click', toggleBounce);
	marker.setMap(map);

	//MAP toggle
	function toggleBounce(){
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}

	locations = locationInformation();
};


//solution https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);