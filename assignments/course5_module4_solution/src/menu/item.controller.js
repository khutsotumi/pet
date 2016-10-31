(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

ItemDetailController.$inject = ['$stateParams', 'categories'];
function ItemDetailController($stateParams, categories) {
  var itemDetail = this;
  var items = categories.data;
  var item = items[$stateParams.categoryID];
  itemDetail.id = item.id;
  itemDetail.name = item.name;
  itemDetail.short_name = item.short_name;

};

})();
