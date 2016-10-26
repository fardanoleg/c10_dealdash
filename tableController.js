app.controller("tableController", function (myFactory, $log, $scope) {
    var self = this;
    this.dealArray = {};
    this.getData = function () {
        myFactory.getData().then(function (response) {
            console.log("Response: ", response);
            self.dealArray = response;
            console.log("DEal Array: ", self.dealArray);
            self.initMap();
        })
    };
    this.getData();

    this.acceptClicked = function (index) {
        console.log("accept was clicked with index:", index);
        myFactory.currentDeal(index);
        myFactory.updateData(index);

    };

    this.initMap = function () {
        console.log("RUNNNING controller INIT:");
        myFactory.initMap();
    };
    // this.initMap();

});
