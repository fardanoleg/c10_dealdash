app.factory("myFactory", function ($http, $log, $q) {
    var server = {};
    var map;
    var indexString = null;
    // server.dealArray = [];
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


    var geoSuccess = function (position) {
        startPos = position;
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
    server.initMap = function () {
        console.log("RUNNING factory INIT:");
        // var uluru = {lat: 33.637290, lng: -117.739515};
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,                                                ///distance
            center: uluru
        });
        // for (var j = 0; j < this.dealArray.length; j++) {
        //     console.log("Array length: ", this.dealArray);
        //     addMarker(j);
        // }
        for (var key in this.dealArray) {
            // console.log('key: ', this.dealArray[key].location);
            var buzDeal = this.dealArray[key].location;
            // console.log(buzDeal);
            addMarker(buzDeal)
        }

        function addMarker(buzDeal) {
            console.log("Running add Marker to the map", buzDeal);
            // console.log("CHECKKK: ", buzDeal.lng);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(buzDeal.lat, buzDeal.lng),
                // icon: 'https://maps.google.com/mapfiles/kml/shapes/snack_bar.png',
                map: map
            })
            console.log(marker);
        }
    }
//     $scope.markers = [];
    //     var uluru = {lat: 33.637290, lng: -117.739515};
    //
    //     var map = new google.maps.Map(document.getElementById('map'), {
    //         zoom: 20, ///distance
    //         center: uluru,
    //         mapTypeId: google.maps.MapTypeId.TERRAIN
    //     });
    //     for (var i = 0; i < this.dealArray.length; i++) {
    //         console.log(" THIS DEAL Array : ", this.dealArray);
    //         addMarker(i);
    //     }
    //
    //     function addMarker(buzDeal) {
    //         console.log("addMarker running:")
    //         var marker = new google.maps.Marker({
    //             position: {lat: this.dealArray[buzDeal].location.lat, lng: this.dealArray[buzDeal].location.lng},
    //             icon: 'https://maps.google.com/mapfiles/kml/shapes/snack_bar.png',
    //             map: map
    //         });
    //         $scope.markers.push(marker);
    //         console.log("Markers ARRAY: ", $scope.markers);
    //     }
    // }
    // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    // var icons = {
    //     food: {
    //         icon: iconBase + 'snack_bar.png'
    //     },
    //     person: {
    //         icon: iconBase + 'man.png'
    //     }
    // };

    // function addMarker(feature) {
    //     var marker = new google.maps.Marker({
    //         position: feature.position,
    //         icon: icons[feature.type].icon,
    //         map: map
    //     });
    // }
    // var features =[
    //     {
    //         position: new google.maps.LatLng(33.636223, -117.739499),
    //         type:'food'
    //     }, {
    //         position: new google.maps.LatLng(33.636201, -117.739440),
    //         type: 'man'
    //     }
    // ];
    // for (var i=0, features; features = features[i]; i++){
    //     addMarker(features);
    // }


    server.getData = function () {
        var defer = $q.defer();
        fbRef.ref('biz').on('value', function (snapshot) {
                defer.resolve(snapshot.val());
                server.dealArray = snapshot.val();
                // for (var currentBiz in biz)
                console.log("data from the firebase: ", server.dealArray);
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


