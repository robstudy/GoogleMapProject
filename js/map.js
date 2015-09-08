function initMap(){
	var map;
	var clovis = {lat: 36.8253, lng: -119.7031};

	//Map initial location
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: clovis,
		disableDefaultUI: true
	});

	//Markers
	for (var spots in foodPlaces.restaurant){
		createMarker(foodPlaces.restaurant[spots]);
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
			infowindow = new google.maps.InfoWindow({content: place.title + "<br>" + place.location});
			infowindow.open(map, marker);
		});
	};
};

