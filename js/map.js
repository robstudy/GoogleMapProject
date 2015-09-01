var map;
function initMap(){

	var locations;

	var clovis = {lat: 36.8253, lng: -119.7031};

	//location information
	function locationInformation(){
		var locations = [];

		for (var spots in foodPlaces.restaurant){
			locations.push(foodPlaces.restaurant[spots].location);
		}
		console.log(locations);
		return locations;
	};

	//Map initial location
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14,
		center: clovis,
		disableDefaultUI: true
	});

	//Markers
	function addMarkers(){
		for (var spots in foodPlaces.restaurant){
			createMarker(foodPlaces.restaurant[spots]);
		}
	};

	//NewCreate Markers
	function createMarker(place){

		var infowindow;

		var marker = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			position:{lat:place.lat, lng: place.lng},
			map: map,
			title: place.title
		});

		google.maps.event.addListener(marker, 'click', function(){
			infowindow = new google.maps.InfoWindow({content: place.title});
			infowindow.open(map, marker);
		});
	};

	locations = locationInformation();
	addMarkers();
};


//solution https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);