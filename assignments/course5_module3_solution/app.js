// the code below is from a John Hopkins student of Yaakov. My code is commented out since there was something wrong displaying.
//am still working on fixing my code
(function() {
        'use strict';

        angular.module('NarrowItDownApp', [])
            .controller('NarrowItDownController', NarrowItDownController)
            .service('MenuSearchService', MenuSearchService)
            .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
            .directive('itemsLoaderIndicator', ItemsLoaderIndicator)
            .directive('foundItems', FoundItems);

        function FoundItems() {
            var ddo = {
                restrict: "E",
                templateUrl: 'foundItems.html',
                scope: {
                    found: '<foundItems',
                    onRemove: '&'
                }
            };

            return ddo;
        }

        function ItemsLoaderIndicator() {
            var ddo = {
                restrict: "E",
                templateUrl: 'itemsLoaderIndicator.html',
                scope: {
                    loading: '=loading'
                }
            };

            return ddo;
        }

        NarrowItDownController.$inject = ['MenuSearchService'];

        function NarrowItDownController(MenuSearchService) {
            var menuController = this;

            menuController.searchText = "";
            menuController.items = [];
            menuController.resultText = "";
            menuController.loading = false;

            var setResultText = function(text) {
                menuController.loading = false;
                menuController.resultText = text;
            }

            var startSearch = function() {
                menuController.resultText = "";
                menuController.loading = true;
                menuController.items = [];
            }

            var setItems = function(data) {
                menuController.items = data;
                if (!data.length) {
                    setResultText("Nothing found");
                } else {
                    setResultText("");
                }
            }

            menuController.removeItem = function(index) {
                menuController.items.splice(index, 1);
            }

            menuController.narrowDown = function() {
                if (!menuController.searchText) {
                    setResultText("Please enter search term");
                } else {
                    startSearch();
                    var prom = MenuSearchService.getMatchedMenuItems(menuController.searchText);
                    prom.then(function(response) {
                            console.log("narrowDown : ", response);
                            setItems(response);
                        })
                        .catch(function(error) {
                            setResultText("Error: " + error);
                        })
                }
            }
        }

        MenuSearchService.$inject = ['$http', '$filter', 'ApiBasePath']

        function MenuSearchService($http, $filter, ApiBasePath) {
            var service = this;
            var lowCase = $filter('lowercase');

            var filterResponse = function(searchTerm) {
                var matchFilter = function(item) {
                    return lowCase(item.description).indexOf(lowCase(searchTerm)) >= 0;
                }

                return function(response) {
                    return response.data.menu_items.filter(matchFilter);
                };
            }

            service.getMatchedMenuItems = function(searchTerm) {
                console.log("searchTerm ", searchTerm);
                return $http.get(ApiBasePath).then(filterResponse(searchTerm));
            }

        }

    }

)();

// this is my code that does not extract the promise properly
// (function () {
//     'use strict';
//     angular.module('NarrowItDownApp', [])
//     .controller('NarrowItDownController', NarrowItDownController)
//     .service('MenuSearchService', MenuSearchService )
//     .directive('foundItems', FoundItemsDirective)
//     .constant('Path', "http://davids-restaurant.herokuapp.com/menu_items.json");
//
//     function FoundItemsDirective() {
//       var ddo = {
//         restrict: "E",
//         templateUrl: 'foundItems.html',
//         scope: {
//           items: '<',   //other code use found instead of items
//           myTitle: '@title',
//           onRemove: '&'
//         },
//         controller: 'NarrowItDownController as ctrl',
//         bindToController: true
//       };
//       return ddo;
//     }; //FoundItemsDirective
//
//     NarrowItDownController.$inject = ['MenuSearchService', '$filter'];
//     function NarrowItDownController(MenuSearchService, $filter) {
//       var Ctrl = this;
//       Ctrl.searchTerm = "";
//       Ctrl.items = [];
//       Ctrl.messageText = "";
//       Ctrl.loading = false;
//       var lowCase = $filter('lowercase');
//
//       var setMessageText = function(text) {
//         Ctrl.loading = false;
//         Ctrl.messageText = text;
//       }; //setMessageText
//
//       Ctrl.nothingFound = function(){
//         // var found = true;
//         if (Ctrl.messageText.length == 0) {
//           return true;
//         } else {
//           return false;
//         }
//       }; //nothingFound
//
//       var filteredData = function(anArray){
//         var revisedList = [];
//         for (var i = 0; i < anArray.length; i++) {
//           // if (anArray.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
//           if (lowCase(anArray.description).indexOf(lowCase(searchTerm)) !== -1) {
//             revisedList.push(anArray[i]);
//           }
//         }
//         return revisedList;
//       }; //filteredData
//
//       Ctrl.removeItem = function(index){
//         // Ctrl.found.splice(index, 1);
//         Ctrl.items.splice(index, 1);
//       }; //removeItem
//
//       Ctrl.findItems = function(){
//         var allList = [];
//         if (!Ctrl.searchTerm) {
//           setMessageText("Please enter word to look up in textbox");
//         } else {
//           Ctrl.loading = true;
//           var promise = MenuSearchService.getMenuItems();
//           console.log(promise);
//           promise.then(function(response) {
//             allList  = response.data;
//             console.log(allList[3]);
//             Ctrl.items = filteredData(allList);
//             if (!Ctrl.items.length) {
//               setMessageText("Nothing found");
//             } else {
//               setMessageText("");
//             }
//           })
//           .catch(function(error){
//             console.log("something went wrong");
//           });
//         }; //else
//       }; //findItems
//     };  //NarrowItDownController
//
//     MenuSearchService.$inject = ['$http', 'Path']
//     function MenuSearchService($http, Path){
//       var service = this;
//       service.getMenuItems = function () {
//         var response = $http ({
//           method: "GET",
//           url: (Path)
//         });
//         console.log(response);
//         return response
//         // return $http.get(Path);
//       };
//     }; //MenuSearchService
//
// })();
