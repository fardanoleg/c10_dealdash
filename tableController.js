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

    this.acceptClicked = function (index) {
        console.log("accept was clicked with index:", index);
        myFactory.currentDeal(index);
        myFactory.updateData(index);

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
    })
});