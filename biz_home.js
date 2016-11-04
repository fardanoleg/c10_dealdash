// Initialize Firebase
var config = {
    apiKey: "AIzaSyBzjXjba7aeBAdup78ENXxmD_Qi8OmSWGQ",
    authDomain: "dealapp-bf461.firebaseapp.com",
    databaseURL: "https://dealapp-bf461.firebaseio.com",
    storageBucket: "dealapp-bf461.appspot.com",
    messagingSenderId: "1029357138612"
};
firebase.initializeApp(config);
var fbRef = firebase.database();


var uluru = {
    lat: null,
    lng: null
};
//takes user's current location, and stores it into the uluru object above.
var startPos;
navigator.geolocation.getCurrentPosition(geoSuccess);
function geoSuccess(position) {
    startPos = position;
    uluru.lat = startPos.coords.latitude;
    uluru.lng = startPos.coords.longitude;
    // console.log(uluru);
}


//displays current deals the business has in effect.
var currentDeal = function () {
    var current = [];
    var query = firebase.database().ref("biz/_test/deals/").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                current.push(childData.deal);
                current.push("<br>");
                document.getElementById("current_info").innerHTML = "Current Deals:<br> " + current;

            });
        });
};

//updates function reads the data stored in firebase and displays it on screen.
//Any changes to the business' info are displayed in real-time.
var updates = {};
var displayData = function () {
    fbRef.ref('biz/_test').on('value', function (snapshot) {
        updates = snapshot.val();
        document.getElementById("bizName").innerHTML = updates.biz_name;
        document.getElementById("street_address").innerHTML = updates.street;
        document.getElementById("city_name").innerHTML = updates.city;
        document.getElementById("state_of").innerHTML = updates.state;
        document.getElementById("zip_code").innerHTML = updates.zip;
        document.getElementById("phone_num").innerHTML = updates.phone;
        updates = {};
    });
};

//updateData takes in two parameters in order to update the appropriate field in firebase with the new info.
var updateData = function (newInfo, field) {
    updates['biz/_test/'+field] = newInfo;
    fbRef.ref().update(updates);
    document.getElementById('change_confirmed').innerHTML = "Update Confirmed: "+newInfo;
    document.getElementById(field).value = "";
};

var newDeal = function (deal, qty) {
    if (qty > 0 && qty < 11 ) {
        var dealMsg = {
            deal
        };
        for (var i = 0; i <= qty -1; i++) {
            console.log(qty +" "+deal+ " deals has been entered");
            fbRef.ref('biz/_test/deals').push(dealMsg);
        }
        // fbRef.ref('biz/_test/deals').push(dealMsg);
        //text that displays after the deal has been entered
        document.getElementById("new_info").innerHTML = "The following deal has been posted:<br> " + deal + " (qty: "+qty+" )";
        document.getElementById('newDeal').value = "";
    }
    else {
        document.getElementById("new_info").innerHTML = "Please enter a valid number from 1 to 10";
    }

};

//createAccount function takes the info entered on the sign up page, makes it into an object, and sends it to firebase
var createAccount = function(name, street, city, state, zip, phone) {
    bizObj ={};
    //takes the parameters passed in to this function, and makes them part of the empty object defined above
    bizObj.biz_name = name;
    bizObj.street = street;
    bizObj.city = city;
    bizObj.state= state;
    bizObj.zip= zip;
    bizObj.phone= phone;
    bizObj.code="";
    bizObj.status="";
    //location takes the user's current location and sets it as the business location
    bizObj.location = {lat: uluru.lat, lng: uluru.lng};
    //pushing info to firebase
    fbRef.ref('biz/').push(bizObj);
    //confirmation screen is displayed after the submit button is clicked, and
    //displays the entered information back to confirm
    document.getElementById('sign_up').innerHTML = "Thank You!";
    document.getElementById('info_confirmed').innerHTML = "Your account has been created: <br> "+
        bizObj.biz_name
        +"<br>"+
        bizObj.street
        +"<br>"+
        bizObj.city
        +" "+
        bizObj.state
        +" "+
        bizObj.zip
        +"<br>"+
        bizObj.phone;
    //bizObj is empty after info is sent to firebase
    bizObj ={};
};











































