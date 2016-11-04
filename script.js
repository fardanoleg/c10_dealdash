app.factory("myFactory", function ($http, $log, $q, $timeout) {
    var server = {};
    var map;
    var indexString = null;
    $log.info(server.dealArray);

    var config = {
        apiKey: "AIzaSyBzjXjba7aeBAdup78ENXxmD_Qi8OmSWGQ",
        authDomain: "dealapp-bf461.firebaseapp.com",
        databaseURL: "https://dealapp-bf461.firebaseio.com",
        storageBucket: "dealapp-bf461.appspot.com",
        messagingSenderId: "1029357138612"
    };

    firebase.initializeApp(config);
    var fbRef = firebase.database();

    //the geoSuccess function determines the user's location.
    //this object stores the user's location (lat/lng) for use in other functions
    server.confirmWindow = false;  //flag for ngHide/ngShow
    server.winnerWindow = false;
    server.newWindow = false;
    server.selectedDealName = {};   //objects for passing the information from the database
    server.selectedDealAdress = {};
    server.selectedDealPhone = {};
    server.selectedDealId = {};
    server.selectedDealStatus = {};
    server.selectedDealCode = {};
    server.codeString = {};
    server.selectedDealLocation = {};
    server.selectedDealTime = {};
    server.selectedDealDistance = {};
    server.selectedDealDirections = {};

    var uluru = {         //user location
        lat: null,
        lng: null
    };
    var startPos = null;

    server.initMap = function () {   //init map at the beginning while loading(need to be changed later)
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 0, lng: 0},
            zoom: 1
        });
        navigator.geolocation.getCurrentPosition(geoSuccess);
        function geoSuccess(position) {
            startPos = position;
            uluru.lat = startPos.coords.latitude;
            uluru.lng = startPos.coords.longitude;
            console.log(uluru);
            server.createMap(uluru)
        };
    };
    server.createMap = function (pos) {   //init map with the user's location at the beginning
        var map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 11
        });
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: iconBase + 'library_maps.png'
        });
    };
    var directionsDisplay;

    server.calcRoute = function (dealIndex) {
        console.log("Calculating route from user's location to the deal owner", dealIndex);
        var directionsService = new google.maps.DirectionsService();
        var start = uluru;
        var end = server.selectedDealLocation;
        console.log("Location start: ", start);
        console.log("Location end: ", end);

        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                console.log("RUNNNING");
                directionsDisplay.setDirections(response);
                var route = response.routes[0];
                console.log("route: ", route);
                server.selectedDealDistance = route.legs[0].distance.text;
                server.selectedDealTime = route.legs[0].duration.text;
            }
        });


    };
    server.currentDeal = function (index) {            // current deal and generate the string for this deal
        console.log('currentDeal running: ', index);
        indexString = this.dealArray[index].phone + this.dealArray[index].zip;
        console.log(indexString);
        server.codeString = this.dealArray[index].phone + this.dealArray[index].zip;
    };
    server.removeData = function (index) {             //remove data from the firebase
        console.log("DELETING Deal from the firebase: ", index);
        fbRef.ref('biz/' + index).remove();
    };


    server.updateData = function (index) {            // update information on the firebase
        console.log("UpdateData running");
        var updates = {};
        var codeString = indexString;
        updates['biz/' + index + '/status'] = 'accepted';
        updates['biz/' + index + '/code'] = codeString;
        fbRef.ref().update(updates);
    };


    //this holds the value of the map zoom, the value is changed when a non-custom search button is clicked.
    //increments; 20 = buildings, 15 = streets, 10 = city
    var setZoom = 11;
    var buzDeal = {};
    var test;

    var distanceSearch;

    server.initMap2 = function () {                   //initiate a map with the deals
        console.log("RUNNING factory INIT:");
        var tempArray = this.dealArray;

        if (distanceSearch == 1) {
            setZoom = 15;
            console.log("miles: " + distanceSearch + " setZoom: " + setZoom)
        }
        else if (distanceSearch == 3) {
            setZoom = 13;
            console.log("miles: " + distanceSearch + " setZoom: " + setZoom)
        }
        else if (distanceSearch == 5) {
            setZoom = 12;
            console.log("miles: " + distanceSearch + " setZoom: " + setZoom)
        }
        else {
            setZoom = 11;
            console.log("miles: " + distanceSearch + " setZoom: " + setZoom)
        }
        var rendererOptions = {   //create object for Renders to make it non-changeble
            // map: map,
            // draggable: true
            preserveViewport: true
        };

        directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        var mapOptions = {
            zoom: setZoom,                                                ///distance
            center: uluru
        };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('panel'));

        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: iconBase + 'library_maps.png'
        });
        console.log("ULURUUUU: ", uluru);
        for (var key in tempArray) {
            console.log('ArrayAAAAA:', tempArray);
            console.log('key: ', key);
            buzDeal = this.dealArray[key].location;
            console.log("BUZZ LAT " + buzDeal.lat);
            test = key;
            distance(uluru.lat, uluru.lng, buzDeal.lat, buzDeal.lng);
        }

        function distance(uLat1, uLon1, bLat2, bLon2) {
            //this function compares the distance between the business and user based on lat/lng
            var radlat1 = Math.PI * uLat1 / 180;
            var radlat2 = Math.PI * bLat2 / 180;
            var theta = uLon1 - bLon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;

            if (dist <= distanceSearch) {
                console.log("searching for deals within " + distanceSearch + " mile(s) or less");
                addMarker(test);
            }
        }

        function addMarker(dealKey) {
            console.log("Running add Marker to the map");
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(tempArray[dealKey].location.lat, tempArray[dealKey].location.lng),
                map: map,
                animation: google.maps.Animation.DROP,
                title: key
            });

            google.maps.event.addListener(marker, 'click', function () {      //event will trigger when the marker will be clicked
                console.log("Listening: ", dealKey);
                server.newWindow = true;
                $timeout(function () {
                    server.selectedDealName = tempArray[dealKey].biz_name;
                    server.selectedDealAdress = tempArray[dealKey].street + " " + tempArray[dealKey].city;
                    server.selectedDealPhone = tempArray[dealKey].phone;
                    server.selectedDealId = dealKey;
                    server.selectedDealStatus = tempArray[dealKey].status;
                    server.selectedDealLocation = tempArray[dealKey].location;
                    server.calcRoute(dealKey);
                }, 0);

            })
        }
    };

    server.getData = function () {        //retriev data from firebase
        var defer = $q.defer();
        fbRef.ref('biz').on('value', function (snapshot) {
                defer.resolve(snapshot.val());
                server.dealArray = snapshot.val();
                console.log("data from the firebase: ", server.dealArray);
                console.log("distanceMiles: ", this.distanceMiles);
                distanceSearch = this.distanceMiles;
                server.initMap2();
            }
        );
        return defer.promise
    };
    return server;
});

function initMap() {            //load myApp after the index page loaded
    console.log("initMap");
    angular.bootstrap($('html')[0], ['myApp']);
}
