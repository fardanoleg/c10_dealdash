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

    };
    this.submitClicked = function () {
        console.log("submitClicked");
        var name = $scope.biz_name;
        console.log("biz_name: ", name);
        var state = $scope.state;
        console.log("state: ", state);
        var city = $scope.city;
        console.log("city: ", city);
        var zip = $scope.zip;
        console.log("zip: ", zip);
        var street = $scope.street;
        console.log("street: ", street);
        var phone = $scope.phone;
        console.log("phone: ", phone);
        var email = $scope.email;
        console.log("email: ", email);
        var password = $scope.password;
        console.log("password: ", password);
        myFactory.createAccount(name, street, city, state, zip, phone, email, password);
        // myFactory.approveWindow = true;
    }
    Object.defineProperty(this, "approveWindow", {
        get: function () {
            console.log("approve Window clicked");
            return myFactory.approveWindow;
        }
    });
});