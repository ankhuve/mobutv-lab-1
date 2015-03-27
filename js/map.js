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
	var zoom = 1/(2*zoom);
	var current = map.getCenter();
	var heading = map.getHeading() || 0;
	if(heading===0){
		if(direction=='u'){
			var newPos = new google.maps.LatLng(current.k+(0.01*zoom), current.D);
		}else if(direction=='d'){
			var newPos = new google.maps.LatLng(current.k-(0.01*zoom), current.D);
		}else if(direction=='r'){
			var newPos = new google.maps.LatLng(current.k, current.D+(0.01*zoom));
		}else if(direction=='l'){
			var newPos = new google.maps.LatLng(current.k, current.D-(0.01*zoom));
		}
	}else if(heading===90){
		if(direction=='l'){
			var newPos = new google.maps.LatLng(current.k+(0.01*zoom), current.D);
		}else if(direction=='r'){
			var newPos = new google.maps.LatLng(current.k-(0.01*zoom), current.D);
		}else if(direction=='u'){
			var newPos = new google.maps.LatLng(current.k, current.D+(0.01*zoom));
		}else if(direction=='d'){
			var newPos = new google.maps.LatLng(current.k, current.D-(0.01*zoom));
		}
	}else if(heading===180){
		if(direction=='d'){
			var newPos = new google.maps.LatLng(current.k+(0.01*zoom), current.D);
		}else if(direction=='u'){
			var newPos = new google.maps.LatLng(current.k-(0.01*zoom), current.D);
		}else if(direction=='l'){
			var newPos = new google.maps.LatLng(current.k, current.D+(0.01*zoom));
		}else if(direction=='r'){
			var newPos = new google.maps.LatLng(current.k, current.D-(0.01*zoom));
		}
	}else{
		if(direction=='r'){
			var newPos = new google.maps.LatLng(current.k+(0.01*zoom), current.D);
		}else if(direction=='l'){
			var newPos = new google.maps.LatLng(current.k-(0.01*zoom), current.D);
		}else if(direction=='d'){
			var newPos = new google.maps.LatLng(current.k, current.D+(0.01*zoom));
		}else if(direction=='u'){
			var newPos = new google.maps.LatLng(current.k, current.D-(0.01*zoom));
		}
	}
	map.setCenter(newPos);
}

var makeMarker = function(movable){
	if(movable){
		iconCol = 'http://google.com/mapfiles/kml/paddle/red-blank.png';
	}else{
		iconCol = 'http://google.com/mapfiles/kml/paddle/red-circle.png'
	}
	marker = new google.maps.Marker({
	    position: map.getCenter(),
	    title:"Hello World!",
	    draggable: movable,
	    icon: iconCol,
	    animation: google.maps.Animation.DROP
	});
	marker.setMap(map);
}

// To add the marker to the map, call setMap();


google.maps.event.addDomListener(window, 'load', initialize);