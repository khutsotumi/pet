(function () {
'use strict';

angular.module('MenuApp')
.component('loadingSpinner', {
  templateUrl: 'src/spinner/spinner.html',
  controller: SpinnerController
});

SpinnerController.$inject = ['$rootScope']
function SpinnerController($rootScope) {
  var $ctrl = this;
  $ctrl.showSpinner = false;

  var cancelListener = $rootScope.$on('categories:processing', function (event, data) {
    console.log("Event: ", event);
    console.log("Data: ", data);

    if (data.on) {
      $ctrl.showSpinner = true;
    }
    else {
      $ctrl.showSpinner = false;
    }
  });

  $ctrl.$onDestroy = function () {
    cancelListener();
  };
};


})();
