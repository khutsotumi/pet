(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home tab if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      template: '<div>Check menu categories in this website</div>'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/templates/categories.template.html',
      controller: 'categoriesController as categoryDetails',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService){
                      return MenuDataService.getAllCategories();
                    }]
      }
    })

    .state('categories.item', {
      url: '/item/{categoryID}',
      templateUrl: 'src/templates/items.template.html',
      controller: 'ItemDetailController as itemDetail',
      resolve: {
        item: ['$stateParams', 'MenuDataService',
                function($stateParams, MenuDataService){
                  return MenuDataService.getItemsForCategory($stateParams.categoryID);
              }]
      }

    })
}

})();
