app.controller("tableController", function (myFactory, $log, $scope) {
    console.log('table Triggered');
    var self = this;
    this.distanceMiles;
    this.dealArray = {};
    this.getData = function () {                     //get data from firebase
        console.log("GET dATA controller running");
        myFactory.getData().then(function (response) {
            console.log("Response: ", response);
            self.dealArray = response;
            console.log("Deal Array: ", self.dealArray);
        })
    };
    this.createMap = function () {
        myFactory.initMap();
    };
    this.createMap();

    this.newWindow = function () {
        myFactory.newWindow();
    };
    this.acceptClicked = function () {
        if (this.selectedDealStatus === "accepted") {
            alert("The deal is not available")
        } else {
            console.log("You clicked accept Clicked: ")//when accept the deal was clicked
            var currentDeal = this.selectedDealId;          //grab the deal by the index
            console.log("CurrentDEal: ", currentDeal);
            confirm("Are you sure you want to accept the deal?");   //confirm window
            if (confirm) {                                          //if confirm is accepted
                myFactory.currentDeal(currentDeal);
                myFactory.updateData(currentDeal);
                // myFactory.sendDealToCustomer(currentDeal);
            } else {
                console.log("deal was not confirmed");
            }
        }
    };


    this.declineClicked = function (index) {          //when decline the deal was clicked will store the deal to the local storage
        console.log("decline was clicked with index: ", index);
    };

    this.clickMileSearch = function (distanceSearch) {
        distanceMiles = distanceSearch;
        console.log("you clicked miles search of amount mile : ", distanceSearch);
        myFactory.newWindow = false;
        self.getData();
    };

    Object.defineProperty(this, "selectedDealName", {      //same as this.selectedDealName = myFactory.selectedDealName;
        get: function () {
            console.log("get selected deal name");
            return myFactory.selectedDealName;
        }
    });
    Object.defineProperty(this, "selectedDealId", {      //same as this.selectedDealId = myFactory.selectedDealId;
        get: function () {
            console.log("get selected deal Id");
            return myFactory.selectedDealId;
        }
    });
    Object.defineProperty(this, "selectedDealAddress", {
        get: function () {
            console.log("get selected deal adress");
            return myFactory.selectedDealAdress;
        }
    });
    Object.defineProperty(this, "selectedDealPhone", {
        get: function () {
            console.log("get selected deal phone");
            return myFactory.selectedDealPhone;
        }
    });
    Object.defineProperty(this, "selectedDealStatus", {
        get: function () {
            console.log("get selected deal status");
            return myFactory.selectedDealStatus;
        }
    });
    Object.defineProperty(this, "newWindow", {
        get: function () {
            console.log("new Window clicked to load");
            return myFactory.newWindow;
        }
    });
});