var map;
var allMarkers = [];

function initMap(){
	var infowindow = new google.maps.InfoWindow({});
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

		var marker = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			position:{lat:place.lat, lng: place.lng},
			map: map,
			title: place.title
		});

		google.maps.event.addListener(marker, 'click', function(){
			var contentString = place.title + "<br>" + place.location;
			infowindow.setContent(contentString);
			infowindow.open(map, this);
		});

		allMarkers.push(marker);
	};

	//OATUH as found in https://github.com/bettiolo/oauth-signature-js
	/*var httpMethod = 'GET',
		yelp_url = 'http://api.yelp.com/v2/business/',
		parameters = {
			oauth_consumer_key: 'rAf_1-qI-AMixiABXuySng',
			oauth_token: '43-6kJ5la1xKegLdE_nzoESLmEGXw4Xd',
			oauth_nonce: 'kllo9940pd9333jh',
			oauth_timestamp: Math.floor(Date.now()/1000),
			oath_signature_method: 'HMAC-SHA1',
			oath_version: '1.0',
		},
		consumerSecret = 't6WlnqnsT6o1yOfhCDlV2bENlbI',
		tokenSecret = 'ZU8_bhU-B9u4c11dTYcUSdgOepc',
		//Generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
		encodedSignature = oauthSignature.generate(httpMethod, yelp_url, parameters, consumerSecret,
			tokenSecret),
		signature = oauthSignature.generate(httpMethod, yelp_url, parameters, consumerSecret, tokenSecret,
			{encodedSignature: false});

	var requestUrl;
	var getYelp = function(place){
		requestUrl = yelp_url + '?term=' + place.title + '&location=' + place.location;
		console.log(requestUrl);
		$.ajax({
			method: "GET",
			url : requestUrl,
			dataType: 'jsonp',
			success: function(){
				console.log("success");
			},
			error: function(){
				alert('Sorry, shits fucked');
			}
		})
	};

	getYelp(foodPlaces.restaurant[0]);*/

};