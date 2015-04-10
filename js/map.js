var initialize = function() {
	var mapOptions = {
		center: { lat: 59.332382, lng: 18.0645235 },
		zoom: 18,
		tilt: 45,
		// heading: 90,
		mapTypeId: google.maps.MapTypeId.HYBRID,
		disableDefaultUI: true
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
};

var rotate90 = function() {
	var heading = map.getHeading() || 0;
	map.setHeading(heading + 90);
}

var zoom = function(num) {
	var zoom = map.getZoom();
	map.setZoom(zoom + num);
}

var pan = function(direction){
	var zoom = map.getZoom();
	var zoom = 0.0001*Math.pow(2, (18-zoom));
	var current = map.getCenter();
	var heading = map.getHeading() || 0;
	if(heading===0){
		if(direction=='u'){
			var newPos = new google.maps.LatLng(current.k+(zoom), current.D);
		}else if(direction=='d'){
			var newPos = new google.maps.LatLng(current.k-(zoom), current.D);
		}else if(direction=='r'){
			var newPos = new google.maps.LatLng(current.k, current.D+(zoom));
		}else if(direction=='l'){
			var newPos = new google.maps.LatLng(current.k, current.D-(zoom));
		}
	}else if(heading===90){
		if(direction=='l'){
			var newPos = new google.maps.LatLng(current.k+(zoom), current.D);
		}else if(direction=='r'){
			var newPos = new google.maps.LatLng(current.k-(zoom), current.D);
		}else if(direction=='u'){
			var newPos = new google.maps.LatLng(current.k, current.D+(zoom));
		}else if(direction=='d'){
			var newPos = new google.maps.LatLng(current.k, current.D-(zoom));
		}
	}else if(heading===180){
		if(direction=='d'){
			var newPos = new google.maps.LatLng(current.k+(zoom), current.D);
		}else if(direction=='u'){
			var newPos = new google.maps.LatLng(current.k-(zoom), current.D);
		}else if(direction=='l'){
			var newPos = new google.maps.LatLng(current.k, current.D+(zoom));
		}else if(direction=='r'){
			var newPos = new google.maps.LatLng(current.k, current.D-(zoom));
		}
	}else{
		if(direction=='r'){
			var newPos = new google.maps.LatLng(current.k+(zoom), current.D);
		}else if(direction=='l'){
			var newPos = new google.maps.LatLng(current.k-(zoom), current.D);
		}else if(direction=='d'){
			var newPos = new google.maps.LatLng(current.k, current.D+(zoom));
		}else if(direction=='u'){
			var newPos = new google.maps.LatLng(current.k, current.D-(zoom));
		}
	}
	map.setCenter(newPos);
}

var makeMarker = function(movable){
	if(movable){
		iconCol = 'img/SuckMyAppIcon-small.png';
	}else{
		iconCol = 'img/SuckMyAppIcon-small-red.png';
	}
	marker = new google.maps.Marker({
	    position: map.getCenter(),
	    draggable: movable,
	    icon: iconCol,
	    animation: google.maps.Animation.DROP
	});
	marker.setMap(map);
}

var getLocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

var metaPos = new google.maps.LatLng(59.348077, 18.071398);
var hotorgetPos = new google.maps.LatLng(59.334831, 18.062093);

var setPosition = function(position) {
    var gpsPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(gpsPos);
}

var showError = function(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

google.maps.event.addDomListener(window, 'load', initialize);