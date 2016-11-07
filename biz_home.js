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


//takes user's current location, and stores it into the uluru object above.
var startPos;
navigator.geolocation.getCurrentPosition(geoSuccess);
function geoSuccess(position) {
    startPos = position;
    uluru.lat = startPos.coords.latitude;
    uluru.lng = startPos.coords.longitude;
}

//stores location of app user
var uluru = {
    lat: null,
    lng: null
};

//createAccount function takes the info entered on the sign up page, makes it into an object, and sends it to firebase
var createAccount = function (name, street, city, state, zip, phone, email) {
    var bizObj = {};
    //takes the parameters passed in to this function, and makes them part of the empty object defined above
    bizObj.biz_name = name;
    bizObj.street = street;
    bizObj.city = city;
    bizObj.state = state;
    bizObj.zip = zip;
    bizObj.phone = phone;
    bizObj.email = email;
    bizObj.code = "";
    bizObj.status = "";
    //location takes the user's current location and sets it as the business location
    bizObj.location = {lat: uluru.lat, lng: uluru.lng};
    //pushing info to firebase
    fbRef.ref('biz/').push(bizObj);
    //confirmation screen is displayed after the submit button is clicked, and
    //displays the entered information back to confirm
    document.getElementById('sign_up').innerHTML = "Thank You!";
    document.getElementById('info_confirmed').innerHTML = "Your account has been created: <br> " +
        bizObj.biz_name
        + "<br>" +
        bizObj.street
        + "<br>" +
        bizObj.city
        + " " +
        bizObj.state
        + " " +
        bizObj.zip
        + "<br>" +
        bizObj.phone
        + "<br>" +
        bizObj.email;
};

// checks the amount of deals already in effect. Function is called when a new deal is entered.
var numOfDeals = [];
var amtOfDealsCheck = function () {
    var query = firebase.database().ref("biz/_test/deals/").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                childData = childSnapshot.val();
                var dealInfo = childData.deal;
                numOfDeals.push(dealInfo);
            })
        })
};


//creates new deal & quantity.
var newDeal = function (deal, qty) {
    //amount of current deals is compared with the max amount of deals allowed (5 deals)
    amtOfDealsCheck();
    if (numOfDeals.length >= 5 || (numOfDeals.length + qty) >= 5) {
        document.getElementById("new_info").innerHTML = "You've exceeded the maximum amount of deals allowed"
    }
    else {
        //conditional checks to make sure the qty is a number between 1-10
        if (qty > 0 && qty < 6) {
            var dealMsg = {
                deal
            };
            //loop that send the deal to firebase depending on the qty entered, i.e. qty of 2 = deal generated twice;
            for (var i = 0; i <= qty - 1; i++) {
                console.log(qty + " " + deal + " deals has been entered");
                fbRef.ref('biz/_test/deals').push(dealMsg);
            }
            //text that displays after the deal has been entered
            document.getElementById("new_info").innerHTML = "The following deal has been posted:<br> " + deal + " (qty: " + qty + " )";
            document.getElementById('newDeal').value = "";
            document.getElementById('newDealQty').value = "";
        }
        else {
            //text that displays if an invalid qty has been entered
            document.getElementById("new_info").innerHTML = "Please enter a valid number from 1 to 10";
        }
    }
};

// //function shows the business its deals currently in effect & provides a customer code
var currentDeal = function () {
    var current = [];
    var query = firebase.database().ref("biz/_test/deals/").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                childData = childSnapshot.val();
                var dealInfo = childData.deal;
                var redemptionCode = childSnapshot.key;
                console.log("Deal info: " + dealInfo + " Redemption code: " + redemptionCode);
                current.push(dealInfo);
                current.push("<button id='redeemBtn' onclick='displayCustCode(" + "\" " + redemptionCode + "\" " + ")'>redeem</button> <br>");
                document.getElementById("current_info").innerHTML = "Current Deals:<br> " + current;
            });
        });
};

//displays the shortened code, created from the randomly generated key firebase assigns to it.
var displayCustCode = function (code) {
    console.log(code);
    var shortCode = code.substring(16);
    document.getElementById("redeem_screen").innerHTML = "<br> Customer Code: " + shortCode + "<br>";
};

//updates function reads the data stored in firebase and displays it on screen.
//Changes to the business' info are displayed in real-time.
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
        document.getElementById("email_addy").innerHTML = updates.email;
        updates = {};
    });
};

//updateData takes in two parameters in order to update the appropriate field in firebase with the new info.
var updateData = function (newInfo, field) {
    updates['biz/_test/' + field] = newInfo;
    fbRef.ref().update(updates);
    document.getElementById('change_confirmed').innerHTML = "Update Confirmed: " + newInfo + "<br>";
    document.getElementById(field).value = "";
};













































