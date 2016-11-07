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

    };
    this.newDD = function () {
        console.log("RUNNNNNING");
        myFactory.newDealDiv = true;
    };

    this.currentDD = function () {
        myFactory.currentDealUp();
        myFactory.currentDealDiv = true;
    };

    this.showDD = function () {
        console.log("running show display: ");
        myFactory.updateDealDiv = true;
    };

    this.newDeal = function () {
        var qty = $scope.quantityInput;
        console.log("quantity: ", qty);
        var dealS = $scope.detailsInput;
        console.log("details deal: ", dealS);
        myFactory.newDeal(qty, dealS);
    };

    this.currentDealClose = function () {
        myFactory.currentDealDiv = false;
    };

    this.newDealClose = function () {
        $scope.quantityInput = null;
        $scope.detailsInput = null;
        document.getElementById("new_info").innerHTML = "";
        myFactory.newDealDiv = false;
    };

    this.updateClose = function () {
        $scope.nameUp = null;
        $scope.streetUp = null;
        $scope.cityUp = null;
        $scope.zipUp = null;
        $scope.phoneUp = null;
        $scope.stateUp = null;
        myFactory.updateDealDiv = false;
    };

    Object.defineProperty(this, "approveWindow", {
        get: function () {
            console.log("approve Window clicked");
            return myFactory.approveWindow;
        }
    });

    Object.defineProperty(this, "newDealDiv", {
        get: function () {
            console.log("newDealDiv clicked");
            return myFactory.newDealDiv;
        }
    });
    Object.defineProperty(this, "currentDealDiv", {
        get: function () {
            console.log("currentDealDiv clicked");
            return myFactory.currentDealDiv;
        }
    });
    Object.defineProperty(this, "updateDealDiv", {
        get: function () {
            console.log("updateDealDiv clicked");
            return myFactory.updateDealDiv;
        }
    });
});