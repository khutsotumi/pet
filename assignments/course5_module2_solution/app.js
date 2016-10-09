(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService );

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var checkList = this;
      checkList.items = ShoppingListCheckOffService.getToBuyItems();
      checkList.removeItem = function(itemIndex) {
        ShoppingListCheckOffService.itemBought(itemIndex);
      };
      checkList.isEmpty = function (){
        if (checkList.items.length == 0) {
          return true;
        } else {
          return false;
        }
      };
    };

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var boughtItems = this;
      boughtItems.items = ShoppingListCheckOffService.getBoughtItems();
      boughtItems.alreadyBoughtList = function(){
        return boughtItems.items;
      };
      boughtItems.emptyList = function(){
        if (boughtItems.items.length == 0) {
          return true;
        } else {
          return false;
        }
      };
    };

    function ShoppingListCheckOffService(){
      var service = this;
      var items = [];
      var bought = [];

      service.addItem = function(itemName, itemQuantity){
        var item = {name: itemName, quantity: itemQuantity};
        bought.push(item);
      };
      items = [{name: "cookies", quantity: 10},
        {name: "grapes", quantity: 5},
        {name: "apple", quantity: 6},
        {name: "burger", quantity: 2},
        {name: "fries", quantity: 1}
      ];
      service.itemBought = function (itemIndex) {
        var removedItem = items.splice(itemIndex, 1);
        bought.push(removedItem[0]);
      };
      service.getToBuyItems = function() {
        return items;
      };
      service.getBoughtItems = function() {
        console.log(bought);
        return bought;
      };
    };

})();
