(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .directive('foundItems', FoundItemsDirective)
    .service('MenuSearchService', MenuSearchService );

    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'matchedmenuitems.html',
        scope: {
          items: '<',
          myTitle: '@title',
          onRemove: '&'
        },
        controller: 'NarrowItDownController as ctrl',
        bindToController: true
      };
      return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var Ctrl = this;
      var searchTerm; //where do we get this searchterm?
      Ctrl.found = getMatchedMenuItems(searchTerm);

      Ctrl.removeItem = function(index){
        Ctrl.found.splice(index, 1);
      };

      Ctrl.nothingFound = function(){
        if (Ctrl.found.length == 0 || searchTerm == undefined) {
          return "nothing found";
        }
        // else {
        //   var msg = someMethodToProcessFoundItems();
        //   return msg;
        // }
      };

    };

    MenuSearchService.$inject = ['$http']
    function MenuSearchService(searchTerm){
      //include the $http service promise call in this function
      var service = this;
      var allMenuItems = getMenuItems();
      var foundList = [];

      service.getMatchedMenuItems = function(searchTerm) {
        for (var i = 0; i < allMenuItems.length; i++) {
          if (allMenuItems.description.toLowerCase().indexOf(searchTerm) !== -1) {
            foundList.push(allMenuItems[i]);
          }
        }
          return foundList;
      };

      function getMenuItems() {
        var response = $http ({
          method: "GET",
          url: ("http://davids-restaurant.herokuapp.com/menu_items.json")
        });
        return response
      };
    };

})();
