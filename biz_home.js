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


var currentDeal = function () {
    var current = [];
    var query = firebase.database().ref("biz/_test/deals/").orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // var key = childSnapshot.key;
                var childData = childSnapshot.val();
                // console.log("KEY: " + key);
                // console.log("childData: " + childData.deal);
                current.push(childData.deal);
                current.push("<br>");
                document.getElementById("current_info").innerHTML = "Current Deals:<br> " + current;

            });
        });
};

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





var updateData = function (newInfo, field) {
// console.log("newInfo: "+newInfo);
// console.;og("field: "+field);
updates['biz/_test/'+field] = newInfo;
fbRef.ref().update(updates);
document.getElementById('change_confirmed').innerHTML = "Update Confirmed: "+newInfo;
document.getElementById(field).value = "";
};




var newDeal = function (deal) {
    console.log("newDeal Added");
    var dealMsg = {
        deal
    };
    fbRef.ref('biz/_test/deals').push(dealMsg);
    document.getElementById("new_info").innerHTML = "The following deal has been posted:<br> " + deal;
    document.getElementById('newDeal').value = "";
};



