(function () {
    'use strict';
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
      $scope.lunchMenu = "";
      $scope.checkOutput="";

      $scope.calcItems = function () {
        var numberOfItems = $scope.lunchMenu.split(',').length;
        if ($scope.lunchMenu == "") {
          $scope.checkOutput = "Please enter data first";
        }
        else if (numberOfItems <= 3) {
          $scope.checkOutput = "Enjoy!";
        }
        else {
          $scope.checkOutput = "Too much!";
        }
      };

      //the code below was my original and I found the above from a student on coursera
      // $scope.calcItems = function() {
      //   var str = $scope.name;
      //   var numItems = str.split(",");
      //   return numItems.length;
      // } ;

      // $scope.message = function() {
      //   var msg = "";
      //   var words = $scope.calcItems();
      //   if (words < 4) {
      //     msg = "Enjoy";
      //   } else if (words > 3){
      //     msg = "Too much";
      //   }
      //   else {
      //     msg = "you must add a list of items in text box";
      //   }
      //   return msg;
      // } ;
    };
})();
