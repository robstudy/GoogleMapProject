//Global variables
var map;
var allMarkers = [];
var didYelpCall = false;
var infowindow;

//initiation of map and markers
function startMap() {
    infowindow = new google.maps.InfoWindow({});
    var clovis = {
        lat: 36.8253,
        lng: -119.7031
    };

    //Map initial location
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: clovis,
        disableDefaultUI: true
    });

    //Markers
    function createAllMarkers() {
        foodPlaces.restaurant.forEach(function(spot) {
            createMarker(spot);
        });
    }
    createAllMarkers();
}

//NewCreate Markers
function createMarker(place) {
    //create a blue marker for google maps
    var azureImage = {
        url: 'img/azure.png',
        scaledSize: new google.maps.Size(40, 40)
    };

    //for pink marker
    var pinkImage = {
        url: 'img/pink.png',
        scaledSize: new google.maps.Size(50, 50)
    };

    var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: {
            lat: place.lat,
            lng: place.lng
        },
        map: map,
        icon: azureImage
    });

    //click on marker event, gets yelp data, resets any pink markers, sets new pink marker
    //if ajax call goes through info window will update
    google.maps.event.addListener(marker, 'click', function() {
        resetAllMarkers();
        setClicked();
        //Per https://forum.jquery.com/topic/catching-a-jsonp-error JQuery cannot handle
        //jsonp errors, if there is no yelp call, infowindow takes information from foodLocations.json
        if (didYelpCall === false) {
            infowindow.setContent('<p class="text-center">' + place.title + '</p><br>' + place.location);
        }
        getYelpData(place);
        //center map just above marker so infowindow displays properly
        map.setCenter({
            lat: place.lat + .04,
            lng: place.lng
        });
        infowindow.open(map, this);
        didYelpCall = false;
    });

    //reset markers function
    function resetAllMarkers() {
        allMarkers.forEach(function(x) {
            if (x.clicked === true) {
                x.clicked = false;
                x.setIcon(azureImage);
            }
        });
    }

    //keep track of marker clicks
    marker.clicked = false;

    //change clicks for pink/azure image toggle
    function setClicked() {
        if (marker.clicked === false) {
            marker.clicked = true;
            marker.setIcon(pinkImage);
        }
    }

    //mouse hover changes icon pink
    marker.addListener('mouseover', function() {
        if (marker.clicked === false) {
            marker.setIcon(pinkImage);
        }
    });

    //sets icon back to blue when not hovered
    marker.addListener('mouseout', function() {
        if (marker.clicked === false) {
            marker.setIcon(azureImage);
        }
    });
    //push all markers into an array for ViewModel
    allMarkers.push(marker);
}


function getYelpData(location) {
    /*Authenticiations for yelp data
     * solution found https://groups.google.com/forum/#!searchin/yelp-developer-support/javascript/yelp-developer-support/5bDrWXWJsqY/YWvrzC_Oe-gJ
     */
    var auth = {
        consumerKey: "rAf_1-qI-AMixiABXuySng",
        consumerSecret: "t6WlnqnsT6o1yOfhCDlV2bENlbI",
        accessToken: "vs_eTqnCGp5ri8TAVmSk3OAHDJTqi267",
        accessTokenSecret: "dJAILnXMfDAklk1swn7pGx0E99E",
        serviceProvider: {
            signatureMethod: "HMAC-SHA1"
        }
    };

    //accessors
    var accessor = {
        consumerSecret: auth.consumerSecret,
        tokenSecret: auth.accessTokenSecret
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
        'action': 'http://api.yelp.com/v2/search',
        'method': 'GET',
        'parameters': parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);

    //ajax call will pass data to updateInfoWindow
    $.ajax({
        'url': message.action,
        'data': parameterMap,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'success': function(data) {
            updateInfoWindow(data.businesses[0]);
            holdArray = data;
        }
    });
}

//Business passes to updateInfoWindow to convert array into HTML
function updateInfoWindow(holdData) {
    var name, rating, img, phoneNumber, snippet, snipPic, holdString;
    name = '<h2 class="text-center">' + holdData.name + '</h2><hr>';
    phoneNumber = '<h4 class="text-center">' + holdData.display_phone + '</h4>';
    rating = '<img src=' + holdData.rating_img_url + ' class="img-responsive img-center"><br>';
    img = '<a href=' + holdData.url + '><img src=' + holdData.image_url + ' class="img-main img-responsive img-center"></a><br>';
    snipPic = '<div class="img-left"><img src=' + holdData.snippet_image_url + '></div>';
    snippet = '<p class="align-right">' + holdData.snippet_text + '</p>';
    holdString = name + phoneNumber + rating + img + snipPic + snippet;
    infowindow.setContent(holdString);
    didYelpCall = true;
}

//remove add markers tutorial https://developers.google.com/maps/documentation/javascript/examples/marker-remov
//clears items from allMarkers array, for use in viewModel.js
function clearMarkers() {
    allMarkers.forEach(function(i) {
        i.setMap(null);
    });
}


