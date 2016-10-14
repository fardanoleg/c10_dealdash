//dummy landford_lunchbox data

var landford_lunchbox = {};

landford_lunchbox.name="Lanford Lunchbox";
landford_lunchbox.addy="123 main";
landford_lunchbox.phn="310.355.1370";
landford_lunchbox.yelp="http://#.com";
landford_lunchbox.fbook="http://#.com";
landford_lunchbox.deal="25% Off Loose Meat Sandwiches";


var app = angular.module('userDeal', []);
app.controller('messageController', function () {
    this.name = landford_lunchbox.name;
    this.message = landford_lunchbox.deal;
    this.phn = landford_lunchbox.phn;
});

