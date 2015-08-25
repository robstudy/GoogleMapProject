var map;
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 36.8253, lng: -119.7031},
		zoom: 12
	});
}