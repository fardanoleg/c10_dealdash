app.controller("tableController", function (myFactory, $log, $scope) {
    console.log('table Triggered');
    var self = this;
    var currentDeal = null;
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

    this.confirmWinner = function () {
        console.log("confirm winner running");
        myFactory.currentDeal(currentDeal);
        myFactory.updateData(currentDeal);
        myFactory.winnerWindow = true;
    };
    this.declineWinner = function () {
        console.log("declineWinner running");
        myFactory.confirmWindow = false;
    }

    this.acceptClicked = function () {
        if (this.selectedDealStatus === "accepted") {
            alert("The deal is not available")
        } else {
            console.log("You clicked accept Clicked: ");               //when accept the deal was clicked
            currentDeal = this.selectedDealId;                    //grab the deal by the index
            console.log("CurrentDEal: ", currentDeal);
            myFactory.confirmWindow = true;

            // var a;

            // function confirM() {
            //     a = confirm("Are you sure you want to accept the deal?");
            //     return a
            // }

            // confirM();
            // if (a) {                                           //if confirm is accepted
            //     myFactory.currentDeal(currentDeal);
            //     myFactory.updateData(currentDeal);
            //
            //     myFactory.winnerWindow = true;
            // } else {
            //     console.log("deal was not confirmed");
            // }
        }
    };

    this.acceptWinner = function (value) {
        console.log("winner accepted", value);
        myFactory.newWindow = false;
        myFactory.winnerWindow = false;
        myFactory.confirmWindow = false;
        myFactory.removeData(currentDeal);

    };

    this.declineClicked = function () {          //when decline the deal was clicked will store the deal to the local storage
        console.log("decline was clicked with:");
        myFactory.newWindow = false;
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
    Object.defineProperty(this, "winnerWindow", {
        get: function () {
            console.log("winner Window clicked");
            return myFactory.winnerWindow;
        }
    });
    Object.defineProperty(this, "selectedDealCode", {
        get: function () {
            console.log("get selected Deal code");
            return myFactory.codeString;
        }
    });
    Object.defineProperty(this, "confirmWindow", {
        get: function () {
            console.log("confirmWindow running");
            return myFactory.confirmWindow;
        }
    });
});