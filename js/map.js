var map;
var allMarkers = [];

function startMap(){
	var infowindow = new google.maps.InfoWindow({});
	var windowContent = '';
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
		//create a blue marker for google maps
		var azureImage = {
			url: 'img/azure.png',
			scaledSize: new google.maps.Size(40,40)
		};
		//for pink marker
		var pinkImage = {
			url: 'img/pink.png',
			scaledSize: new google.maps.Size(50, 50)
		}

		var marker = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			position:{lat:place.lat, lng: place.lng},
			map: map,
			title: place.title,
			icon: azureImage
		});

		google.maps.event.addListener(marker, 'click', function(){
			getYelpData(place);
			resetAllMarkers();
			setClicked();
			infowindow.setContent(windowContent);
			infowindow.open(map, this);
		});

		//reset markers function
		function resetAllMarkers(){
			for(var x in allMarkers){
				if (allMarkers[x].clicked === true) {
					allMarkers[x].clicked = false;
					allMarkers[x].setIcon(azureImage);
				};
			}
		}

		//keep track of marker clicks
		marker.clicked = false;

		function setClicked(){
			if (marker.clicked === false) {
				marker.clicked = true;
				marker.setIcon(pinkImage);
			};
		}

		//mouse hover changes icon pink
		marker.addListener('mouseover', function(){
			if(marker.clicked === false){
				marker.setIcon(pinkImage);
			}
		});
		//sets icon back to blue when not hovered
		marker.addListener('mouseout', function(){
			if(marker.clicked === false){
				marker.setIcon(azureImage);
			}
		})

		allMarkers.push(marker);
	};

	function getYelpData(location) {
	    /*Authenticiations for yelp data
	    * solution found https://groups.google.com/forum/#!searchin/yelp-developer-support/javascript/yelp-developer-support/5bDrWXWJsqY/YWvrzC_Oe-gJ
	    */
	    var auth = {
	                consumerKey : "rAf_1-qI-AMixiABXuySng",
	                consumerSecret : "t6WlnqnsT6o1yOfhCDlV2bENlbI",
	                accessToken : "vs_eTqnCGp5ri8TAVmSk3OAHDJTqi267",
	                accessTokenSecret : "dJAILnXMfDAklk1swn7pGx0E99E",
	                serviceProvider : {
	                    signatureMethod : "HMAC-SHA1"
	                }
	            };
	    
	    //accessors
	    var accessor = {
	        consumerSecret : auth.consumerSecret,
	        tokenSecret : auth.accessTokenSecret
	    };
	    
	    //Parameters list to pass to JSON object
	    var parameters = [];
	    parameters.push(['term', location.title]);
	    parameters.push(['location', location.location]);
	    parameters.push(['callback', 'cb']);
	    parameters.push(['oauth_consumer_key', auth.consumerKey]);
	    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	    parameters.push(['oauth_token', auth.accessToken]);
	    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

	    //JSON method
	    var message = {
	        'action' : 'http://api.yelp.com/v2/search',
	        'method' : 'GET',
	        'parameters' : parameters
	    };
	    
	    OAuth.setTimestampAndNonce(message);
	    OAuth.SignatureMethod.sign(message, accessor);
	    
	    var parameterMap = OAuth.getParameterMap(message.parameters);

	    $.ajax({
	        'url' : message.action,
	        'data' : parameterMap,
	        'dataType' : 'jsonp',
	        'jsonpCallback' : 'cb',
	        'success' : function(data){
	            console.log(data);
	            var holdData = data.businesses[0];
	            var name, rating, img, phoneNumber, holdString;
	            name = '<h3>' + holdData.name + '</h3><br>';
	            rating = '<img src=' + holdData.rating_img_url + '><br>';
	            img = '<img src=' + holdData.image_url + '><br>';
	            phoneNumber = '<p>' + holdData.display_phone + '</p>';
	            holdString = name + rating + img + phoneNumber;
	            windowContent = holdString;
	        }
	    });
	}
};

startMap();


