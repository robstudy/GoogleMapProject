var map;
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 36.8253, lng: -119.7031},
		zoom: 12
	});
};

//solution https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);