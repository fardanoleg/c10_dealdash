app.controller("tableController", function (myFactory, $log, $scope) {
    console.log('tableTriggered');
    var self = this;
    this.dealArray = {};
    this.getData = function (index) {
        console.log(index);
        myFactory.getData().then(function (response) {
            console.log("Response: ", response);
            self.dealArray = response;
            console.log("DEal Array: ", self.dealArray);
            // self.initMap();
        })
    };

    this.acceptClicked = function () {
        var currentDeal = this.selectedDealId;
        console.log("CurrentDEal: ", currentDeal);
        // console.log("accept was clicked with index:", index);
        confirm("Are you sure you want to accept the deal?");
        if (confirm) {
            myFactory.currentDeal(currentDeal);
            myFactory.updateData(currentDeal);
        }
    };

    this.declineClicked = function (index) {
        console.log("decline was clicked with index: ", index);
    };

    Object.defineProperty(this, "selectedDealName", {
        get: function () {
            console.log("get selected deal");
            return myFactory.selectedDealName;
        }
    });
    Object.defineProperty(this, "selectedDealAdress", {
        get: function () {
            console.log("get selected deal");
            return myFactory.selectedDealAdress;
        }
    });
    Object.defineProperty(this, "selectedDealPhone", {
        get: function () {
            console.log("get selected deal");
            return myFactory.selectedDealPhone;
        }
    });
    Object.defineProperty(this, "selectedDealId", {

        get: function () {
            console.log("get selected deal Id");
            return myFactory.selectedDealId;
        }
    });
});