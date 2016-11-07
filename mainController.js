app.controller("mainController", function (myFactory, $log, $scope) {
    console.log('mainController  Triggered');
    var self = this;
    this.userName = null;
    this.passwordName = null;
    this.signInn = function () {
        console.log("running signINN");
        self.userName = $scope.userName;
        console.log("name: ", self.userName);
        self.passwordName = $scope.passwordName;
        console.log("password: ", self.passwordName);
    };
    this.signUpp = function () {
        console.log("running signUPP");

    }


})