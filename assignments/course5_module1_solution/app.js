(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController)
// .filter('input', inputFilter)
// .filter('message', messageFilter);
;
//LunchCheckController.$inject = ['$scope', 'inputFilter'];
LunchCheckController.$inject = ['$scope', '$filter'];
// function LunchCheckController($scope, inputFilter) {
function LunchCheckController($scope, $filter) {
  //get user input
  $scope.name = "";
  $scope.calcItems = getItems($scope.name);
  $scope.message = messageFilter();

  //$scope.stateOfBeing = "hungry";

  // $scope.sayMessage = function () {
  //   var msg = "Yaakov likes to eat healthy snacks at night!";
  //   return msg;
  // };
  //
  // $scope.sayLovesMessage = function () {
  //   var msg = "Yaakov likes to eat healthy snacks at night!";
  //   msg = lovesFilter(msg)
  //   return msg;
  // };

  // $scope.feedYaakov = function () {
  //   $scope.stateOfBeing = "fed";
  // };
};

function getItems(string) {
  var numItems = string.split(",");
  // for (var i = 0; i < string.length; i++) {
  //   if (string.charAt(i)===",") {
  //     numItems++;
  //   }
  // }
  message = "numItems";
  return numItems;
};

function messageFilter() {
  // return function (input, target, replace) {
  //   input = input || "";
  //   input = input.replace(target, replace);
  //   return input;
  // }
  if (calcItems<4) {
      message = "Enjoy";
  } else if (calcItems > 3){
    message = "Too much";
  }
  else {
    message = "you must add a list of items in text box";
  }
};

})();
