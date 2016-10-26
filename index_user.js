
var startPos;

var geoSuccess = function (position) {
    startPos = position;
    // document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    // document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    uluru.lat = startPos.coords.latitude;
    uluru.lng = startPos.coords.longitude;

};
navigator.geolocation.getCurrentPosition(geoSuccess);

//this is the user's location
var uluru = {
    lat: null,
    lng: null
};

//this contains the lat/lng coordinates for the viewport,
//which is set in the initMap function. This updates
//when the map is moved.
var ne = null;
var sw = null;


function initMap() {
    // var uluru = {lat: 33.644942, lng: -117.816735};
    // console.log("2nd");
    var map = new google.maps.Map(document.getElementById('map'), {

        zoom: 20,
        center: uluru
    });
    // console.log("3rd");
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });

    //this provides the lat and lng of the current viewport
    google.maps.event.addListener(map, 'idle', function () {
        // console.log("4th");
        var bounds = map.getBounds();

        ne = bounds.getNorthEast();
        sw = bounds.getSouthWest();

        console.log("NE " + ne);
        console.log("SW " + sw);

    });


}





