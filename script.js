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
    var startPos;
    var geoSuccess = function (position) {
        startPos = position;
        uluru.lat = startPos.coords.latitude;
        uluru.lng = startPos.coords.longitude;

    };
    navigator.geolocation.getCurrentPosition(geoSuccess);

//this object stores the user's location (lat/lng) for use in other functions
    var uluru = {
        lat: null,
        lng: null
    };


    server.selectDealName = {};
    server.selectDealAdress = {};
    server.selectDealPhone = {};
    server.selectedDealId = {};

    server.currentDeal = function (index) {
        console.log('currentDeal running: ', index);
        indexString = this.dealArray[index].phone + this.dealArray[index].zip;
        console.log(indexString);
    };

    server.updateData = function (index) {
        console.log("UpdateData running");
        var updates = {};
        var codeString = indexString;
        updates['biz/' + index + '/status'] = 'BBBBccepted';
        updates['biz/' + index + '/code'] = codeString;
        fbRef.ref().update(updates);
    };


    //this holds the value of the map zoom, the value is changed when a non-custom search button is clicked.
    //increments; 20 = buildings, 15 = streets, 10 = city
    var setZoom = 11;

    //this sets the search range, default is null, so no businesses will show up until the search button is clicked.
    var miles = null;

    //distanceSearch is passed into the function when the search button is clicked.
    clickMileSearch = function (distanceSearch) {
        miles = distanceSearch;
        //these conditionals set the search range, which are used by the distance function.
        if (distanceSearch == 1) {
            setZoom = 15;
            console.log("miles: "+miles+" setZoom: "+setZoom)
        }
        else if (distanceSearch == 3) {
            setZoom = 12;
            console.log("miles: "+miles+" setZoom: "+setZoom)
        }
        else if (distanceSearch == 5) {
            setZoom = 11;
            console.log("miles: "+miles+" setZoom: "+setZoom)
        }
        else {
            setZoom = 11;
            console.log("miles: "+miles+" setZoom: "+setZoom)
        }
        server.initMap();
    };

    server.initMap = function () {                   //initiate a map
        console.log("RUNNING factory INIT:");
        // var uluru = {lat: 33.637290, lng: -117.739515};
        var tempArray = this.dealArray;
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: setZoom,                                                ///distance
            center: uluru
        });
        for (var key in tempArray) {
            console.log('ArrayAAAAA:', tempArray);
            console.log('key: ', key);
            buzDeal = this.dealArray[key].location;
            console.log("BUZZ LAT "+buzDeal.lat);
            test = key;
            distance(uluru.lat, uluru.lng, buzDeal.lat, buzDeal.lng);

        }

        var buzDeal = {};
        var test = null;


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

            if (dist <= miles) {
                console.log("searching for deals within " + miles + " mile(s) or less");
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
            google.maps.event.addListener(marker, 'click', function () {
                $timeout(function () {
                    server.selectedDealName = tempArray[dealKey].biz_name;
                    server.selectedDealAdress = tempArray[dealKey].street + " " + tempArray[dealKey].city;
                    server.selectedDealPhone = tempArray[dealKey].phone;
                }, 0);
            })
        }
    };

    server.getData = function () {
        var defer = $q.defer();
        fbRef.ref('biz').on('value', function (snapshot) {
                defer.resolve(snapshot.val());
                server.dealArray = snapshot.val();
                console.log("data from the firebase: ", server.dealArray);
                server.initMap();
            }
        );
        return defer.promise
    };
    return server;
});

function initMap() {
    console.log("initMap");
    angular.bootstrap($('html')[0], ['myApp']);
}


