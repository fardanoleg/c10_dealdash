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

    };

    this.acceptClicked = function () {
        if (this.selectedDealStatus === "accepted") {
            alert("The deal is not available")
        } else {
            console.log("You clicked accept Clicked: ");               //when accept the deal was clicked
            currentDeal = this.selectedDealId;                    //grab the deal by the index
            console.log("CurrentDEal: ", currentDeal);
            myFactory.confirmWindow = true;
        }
    };

    this.acceptWinner = function (value) {
        var emailInfo = $scope.emailInfo;
        console.log("emailInfo: ", emailInfo);
        console.log("winner accepted", value);
        myFactory.newWindow = false;
        myFactory.winnerWindow = false;
        myFactory.confirmWindow = false;
        myFactory.removeData(currentDeal);
    };

    this.declineClicked = function () {          //when decline the deal was clicked will store the deal to the local storage
        console.log("decline was clicked with:");
        indexClass = 0;
        myFactory.newWindow = false;
        myFactory.removeDirection();
    };

    this.clickMileSearch = function (distanceSearch) {
        var distanceInput = $scope.distanceCustom;
        console.log('distance: ', distanceInput);
        if (distanceSearch != null) {
            distanceMiles = distanceSearch;
            console.log("you clicked miles search of amount mile : ", distanceSearch);
        } else {
            distanceMiles = distanceInput;
        }
        myFactory.newWindow = false;
        self.getData();
    };
    var classArray = ["new_window", "new_window1", "new_window2"];
    var indexClass = 0;
    this.new_window_class = "new_window";
    this.new_window = function () {
        console.log("RUNNNING");
        return classArray[indexClass];
    };

    this.extraButton = function () {
        console.log(" Extra Button Clicked");
        indexClass++;
        if (indexClass == classArray.length) {
            indexClass = 0;
        }
    }
    this.changeButtonClass = function () {
        console.log("Change class running");

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
    Object.defineProperty(this, "selectedDealTime", {
        get: function () {
            console.log("get selected Deal time");
            return myFactory.selectedDealTime;
        }
    });
    Object.defineProperty(this, "selectedDealDistance", {
        get: function () {
            console.log("get selected Deal distance");
            return myFactory.selectedDealDistance;
        }
    });

});