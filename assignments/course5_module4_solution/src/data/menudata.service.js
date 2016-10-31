(function () {
'use strict';

angular.module('DataModule')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$q', '$timeout', '$http']
function MenuDataService($q, $timeout, $http) {
  var service = this;


  service.getAllCategories = function(){
    var response = $http({
      method: "GET",
      url: 'https://davids-restaurant.herokuapp.com/categories.json'
    });
    return response;
  };


  service.getItemsForCategory = function(categoryID){
    var path = "https://davids-restaurant.herokuapp.com/menu_items.json";
    var response = $http( {
      method: "GET",
      url: (path),
      params: {
        category: categoryID
      }
    });
    return response;
  }
}

})();
