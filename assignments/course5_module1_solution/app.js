(function () {
    'use strict';
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController)
    // .filter('input', inputFilter)
    .filter('message', messageFilter);
    //LunchCheckController.$inject = ['$scope', 'inputFilter'];
    LunchCheckController.$inject = ['$scope', '$filter'];
    // function LunchCheckController($scope, inputFilter) {
    function LunchCheckController($scope, $filter) {
      $scope.name = "";
      $scope.calcItems = function() {
        var str = $scope.name;
        var numItems = str.split(",");
        return numItems;
      } ;
      $scope.message = function() {
        var msg = "";
        var words = calcItems();
        if (words < 4) {
          msg = "Enjoy";
        } else if (words > 3){
          msg = "Too much";
        }
        else {
          msg = "you must add a list of items in text box";
        }
        return msg;
      } ;
    }; //end of function LunchCheckController
})();
