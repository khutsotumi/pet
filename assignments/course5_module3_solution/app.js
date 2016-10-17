(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .directive('foundItems', FoundItemsDirective)
    .service('MenuSearchService', MenuSearchService )
    .constant('Path', "http://davids-restaurant.herokuapp.com/menu_items.json");

    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          items: '<foundItems',   //other code use found instead of items
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
      Ctrl.searchTerm = "";
      Ctrl.items = [];
      Ctrl.messageText = "";
      Ctrl.loading = false;

      var setMessageText = function(text) {
        Ctrl.loading = false;
        Ctrl.messageText = text;
      };

      var filteredData = function(anArray){
        var revisedList = [];
        for (var i = 0; i < anArray.length; i++) {
          if (anArray.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            revisedList.push(anArray[i]);
          }
        }
        return revisedList;
      };

      Ctrl.findItems = function(Ctrl.searchTerm){
        var allList = [];
        if (!Ctrl.searchTerm) {
          setMessageText("Please enter word to look up in textbox");
        } else {
          Ctrl.loading = true; //to prepare for items display
          // var promise = MenuSearchService.getItems(Ctrl.searchTerm);
          var promise = MenuSearchService.getMenuItems();
          promise.then(function(response) {
            allList  = response.data;
            Ctrl.items = filteredData(allList);
            if (!Ctrl.items.length) {
              setMessageText("Nothing found");
            } else {
              setMessageText("");
            }
          })
          .catch(function(error){
            console.log("something went wrong");
          });
        };
      };
      // Ctrl.computeSearch = function() {
      //   if (Ctrl.items.length > 0) {
      //     Ctrl.items = found;
      //   }
      // };
      // Ctrl.found = function (Ctrl.searchTerm) {
      //   var foundList = [];
      //   for (var i = 0; i < allList.length; i++) {
      //     if (allList.description.toLowerCase().indexOf(Ctrl.searchTerm) !== -1) {
      //       foundList.push(allMenuItems[i]);
      //     }
      //   }
      //     return foundList;
      // };

      Ctrl.removeItem = function(index){
        // Ctrl.found.splice(index, 1);
        Ctrl.items.splice(index, 1);
      };

      Ctrl.nothingFound = function(){
        var found = false;
        if (Ctrl.items.length == 0 || Ctrl.searchTerm == "") {
          found = true;
        }
        return found;
      };

    MenuSearchService.$inject = ['$http', 'Path']
    function MenuSearchService($http, Path){
      var service = this;
      // var allList = [];
      // var revisedList = [];

      // service.getItems(searchTerm) {
      //   var promise = service.getMenuItems();
      //   promise.then(function(response) {
      //     allList  = response.data;
      //     for (var i = 0; i < allList.length; i++) {
      //       if (allList.description.toLowerCase().indexOf(searchTerm) !== -1) {
      //         revisedList.push(allList[i]);
      //       }
      //     }
      //   })
      //   .catch(function(error){
      //     console.log("something went wrong");
      //   });
      //   return revisedList;
      // };

      service.getMenuItems = function () { //make this an internal method if programme works
        var response = $http ({
          method: "GET",
          url: (Path) //"http://davids-restaurant.herokuapp.com/menu_items.json"
          // ,
          // params: {
          //   name: "name",
          //   shortName: "short_name",
          //   descrp: "description"
          // }
        });
        return response
      };
    };

})();
