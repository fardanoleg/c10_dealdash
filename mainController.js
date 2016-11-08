app.controller("mainController", function (myFactory, $log, $scope) {
    console.log('mainController  Triggered');
    var self = this;
    this.dealData = null;

    this.indexRedeem = null;
    this.current = [];
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
        self.current = [];
        myFactory.currentDealUp().then(function (snapshot) {
            console.log('Snapshot is: ', snapshot.val());
            $scope.$apply(function () {
                self.dealData = snapshot.val();
                console.log("check deal data array: ", self.dealData);
                for (var key in self.dealData) {
                    var deal = self.dealData[key];
                    console.log("deal: ", deal);
                    var temp = key;
                    var code = temp.substr(15);
                    console.log("code: ", code);
                    deal.redeemString = code;
                    console.log(deal);
                    self.current.push(deal);
                    console.log(self.current);

                }
                myFactory.btnRedeem = true;
            });
        });
        myFactory.currentDealDiv = true;
    };

    this.redeemButton = function (index) {
        self.indexRedeem = index;
        console.log("redemm button clicked: ", self.indexRedeem);
        myFactory.redeemInfo = true;
    };
    this.currentIndex = function () {
        console.log(" current index running");
        var a = self.current[self.indexRedeem];
        console.log("a: ", a);
        return a
    }
    this.showDD = function () {
        console.log("running show display: ");
        myFactory.updateDealDiv = true;
    };
this.
    this.newDeal = function () {
        var qty = parseInt($scope.quantityInput);
        console.log("quantity: ", qty);
        var dealS = $scope.detailsInput;
        console.log("details deal: ", dealS);
        myFactory.newDeal(qty, dealS);
    };

    this.currentDealClose = function () {
        self.current = [];
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
    Object.defineProperty(this, "btnRedeem", {
        get: function () {
            console.log("redeem clicked");
            return myFactory.btnRedeem;
        }
    });
    Object.defineProperty(this, "redeemInfo", {
        get: function () {
            console.log("redeemInfo clicked");
            return myFactory.redeemInfo;
        }
    });
});
