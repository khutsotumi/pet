
(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService )
    .directive('foundItems', FoundItemsDirective)
    .directive('itemsLoaderIndicator', ItemsLoaderIndicator)
    .constant('Path', "http://davids-restaurant.herokuapp.com/menu_items.json");

    function FoundItemsDirective() {
      var ddo = {
        restrict: "E",
        templateUrl: 'foundItems.html',
        scope: {
          items: '<foundItems',
          myTitle: '@title',
          onRemove: '&'
        },
        controller: 'NarrowItDownController as ctrl',
        bindToController: true
      };
      return ddo;
    }; //FoundItemsDirective

    function ItemsLoaderIndicator() {
            var ddo = {
                restrict: "E",
                templateUrl: 'loader/itemsLoaderIndicator.html',
                scope: {
                    loading: '<'  //'=loading'
                },
                controller: 'NarrowItDownController as ctrl',
                bindToController: true
            };

            return ddo;
        }; //itemsLoaderIndicator

    NarrowItDownController.$inject = ['MenuSearchService', '$filter'];
    function NarrowItDownController(MenuSearchService, $filter) {
      var Ctrl = this;
      Ctrl.searchTerm = "";
      Ctrl.items = [];
      Ctrl.messageText = "";
      Ctrl.loading = false;

      var setMessageText = function(text) {
        Ctrl.loading = false;
        Ctrl.messageText = text;
      }; //setMessageText

      Ctrl.nothingFound = function(){
        if (Ctrl.messageText.length == 0) {
          return true;
        } else {
          return false;
        }
      }; //nothingFound

      var filteredData = function(anArray){
        var lowCase = $filter('lowercase');
        var revisedList = [];
        for (var i = 0; i < anArray.length; i++) {
          if (lowCase(anArray[i].description).indexOf(lowCase(Ctrl.searchTerm)) !== -1) {
            revisedList.push(anArray[i]);
          }
        }
        return revisedList;
      }; //filteredData

      Ctrl.removeItem = function(index){
        Ctrl.items.splice(index, 1);
      }; //removeItem

      Ctrl.findItems = function(){
        var allList = [];
        if (!Ctrl.searchTerm) {
          setMessageText("Please enter word to look up in textbox");
        } else {
          Ctrl.messageText = "";
          Ctrl.loading = true;
          var promise = MenuSearchService.getMenuItems();
          promise.then(function(response) {
            allList  = response.data.menu_items;
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
        }; //else
      }; //findItems
    };  //NarrowItDownController

    MenuSearchService.$inject = ['$http', 'Path']
    function MenuSearchService($http, Path){
      var service = this;
      service.getMenuItems = function () {
        var response = $http ({
          method: "GET",
          url: (Path)
        });
        return response
      };
    }; //MenuSearchService

})();
