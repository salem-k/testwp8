//TODO FIXME css : cas de contact qui a un nom et pas de prenom
appContext.controller("ContactListController", [
    '$scope',
    'ContactsService',
    '$ionicPlatform',
    '$cordovaSQLite',
    'LoadingService',
    '$rootScope',
    'cameraService',
    '$ionicHistory',
    'MenuService',
    '$ionicScrollDelegate',
    '$state',
    '$location',
    '$ionicPosition',
    '$timeout',
    function($scope, ContactsService, $ionicPlatform, $cordovaSQLite, LoadingService, $rootScope, cameraService, $ionicHistory, MenuService, $ionicScrollDelegate,$state,$location,$ionicPosition,$timeout) {

        var db = null;
        $ionicPlatform.ready(function() {
            /**
             * create/open DB
             */
            if (window.cordova) {
                db = $cordovaSQLite.openDB("buzcard.db"); // device
            } else {
                db = window.openDatabase("buzcard.db", '1', 'my', 1024 * 1024 * 10); // browser
            }
            $scope.shownGroup = null;
            MenuService.setLocalStorage("firstLoad",0);
//            $scope.creditParrainage = 0;
//            ContactsService.getCreditParrainage(function(credit) {
//                if (MenuService.getLocalStorage("credit") != credit) {
//                    MenuService.setLocalStorage("credit", credit);
//                }
//                $scope.creditParrainage = credit;
//            });
            
        });
        
        $scope.$on('$ionicView.beforeEnter', function( scopes, states ) {
    		init();
        });

        function init() {
        	
//        	console.log( "ReloadContactList ============= " + MenuService.getLocalStorage("ReloadContactList") );
//        	console.log( "firstLoad ============= " + MenuService.getLocalStorage("firstLoad") );

        	if ( MenuService.getLocalStorage("firstLoad") == 0 || MenuService.getLocalStorage("firstLoad") == false || ( MenuService.getLocalStorage("ReloadContactList") != 0 || MenuService.getLocalStorage("ReloadContactList") != false ) ){
        		
        		 $ionicScrollDelegate.scrollTop(false);
        		$scope.creditParrainage = MenuService.getLocalStorage("credit");
	            // initialize
	            var accordionNames = ["Tous mes contacts", "Tous mes followers"];
	            $scope.tabs = [];
	            $scope.groups = [];
	            $scope.recontact = {
	                items: [],
	                count: 0,
	                empty: true, 
	            };
	            $scope.search = {
	                name: "Résultat de recherche",
	                items: [],
	                empty: true,
	            };
	            $scope.show = false;
	
	            // create accordion tabs{
	                $scope.tabs[0] = {
	                    id: 1,
	                    items: [],
	                    count: 0,
	                    page: 1,
	                    totalPages: 1,
	                    empty: true,
	                };
		            // create accordion tabs{
	                $scope.tabs[1] = {
	                    id: 2,
	                    items: [],
	                    count: 0,
	                    page: 1,
	                    totalPages: 1,
	                    empty: true,
	                };
            MenuService.setLocalStorage("firstLoad",1) 
        	MenuService.setLocalStorage("ReloadContactList",0);
            /**
             * begin of SQL transactions
             */
            // select the first contact page
            ContactsService.selectContacts(db, 1, function(result) {
                $scope.tabs[0].items = [];
                if (result.rows.length > 0) {
                    $scope.tabs[0].empty = false;
                    for (var int = 0; int < result.rows.length; int++) {
                    	$scope.tabs[0].items.push(result.rows.item(int));
                    	//fin test
                    }
                } else {
                    $scope.tabs[0].items.push({});
                    $scope.tabs[0].empty = true;
                }

                // select the first Followers page
                ContactsService.selectFollowers(db, 1, function(result) {
                    $scope.tabs[1].items = [];
                    if (result.rows.length > 0) {
                        $scope.tabs[1].empty = false;
                        for (var int = 0; int < result.rows.length; int++) {
                           // $scope.tabs[1].items.push(result.rows.item(int));
                        	$scope.tabs[1].items.push(result.rows.item(int));
                        }
                    } else {
                        $scope.tabs[1].items.push({});
                        $scope.tabs[1].empty = true;
                    }
                    // get followers count
                    ContactsService.getCountOfContact(db, function(result) {
                        var fowllowersCount = 0;
                        if (result.rows.length > 0) {
                            for (var key in result.rows.item(0)) {
                                fowllowersCount = result.rows.item(0)[key];
                                $scope.tabs[1].count = result.rows.item(0)[key];	
                                $scope.tabs[1].totalPages = guessPagesNumber($scope.tabs[1].count);
                            }
                        } else {
                            $scope.tabs[1].count = 0;
                            $scope.tabs[1].empty = true;
                        }
                        // get contact count
                        ContactsService.getCountOfAllContact(db, function(result) {
                        	
                            if (result.rows.length > 0) {
                                var nonFollowersCount = 0;
                                for (var key in result.rows.item(0)) {
                                    nonFollowersCount = result.rows.item(0)[key];
                                }
                                $scope.tabs[0].count = nonFollowersCount;
                                $scope.tabs[0].totalPages = guessPagesNumber($scope.tabs[0].count);
                            } else {
                                $scope.tabs[0].count = 0;
                            }
                            //get group list
                            //get contact per group
                            ContactsService.selectAllGroup(db, function(result) {
                                $scope.groupNumber = result.rows.length;
                                if (result.rows.length > 0) {
                                    for (var int = 0; int < result.rows.length; int++) {
                                        $scope.groups[int] = {
                                            name: result.rows.item(int).name,
                                            items: [],
                                        };
                                    }
                                    ContactsService.getAllContactsByGroup(db, $scope, $scope.groups.length, function() {
                                    	for (var int = 0; int < $scope.groups.length; int++) {
                                    		$scope.groups[int].nbr = guessPagesNumber($scope.groups[int].nbr);
                                    		$scope.groups[int].page = 1;
//                                    		$scope.groups[int].nbr = result.rows.item(int).nbr;
                                    		//ssss
                                    	}
                                    });
                                } else {
                                	console.log("emptyyy....");
                                }
                            })
                          //get à recontacter list
                            ContactsService.selectRecontact(db, function(result) {
                                $scope.recontact.items = [];
                                if (result.rows.length > 0) {
                                    $scope.recontact.empty = false;
                                    $scope.recontact.count = result.rows.length;
                                    for (var int = 0; int < result.rows.length; int++) {
                                    	$scope.recontact.items.push(result.rows.item(int));
                                    }
                                } else {
                                    $scope.recontact.empty = true;
                                }
                            });
                        });
                    });
                });
            });
//}
        	}
        }
        /**
         * if given group is the selected group, deselect it else, select the
         * given group
         */
        $scope.toggleGroup = function(group, element) {
        	
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
         
            
            $ionicScrollDelegate.$getByHandle().scrollTop(false);
          
        };

        $scope.isGroupShown = function(group) {
        	
            return $scope.shownGroup === group;
        };
        /**
         * if given group tab is the selected group tab, deselect it else, select the
         * given group tab
         */
        $scope.toggleGroupX = function(group, element) {
        	
            if ($scope.isGroupShownX(group)) {
                $scope.shownGroupX = null;
            } else {
                $scope.shownGroupX = group;
            }
            
            $location.hash(element);
            var handle = $ionicScrollDelegate.$getByHandle();
         //   $ionicScrollDelegate.resize();
            $timeout(function(){
            	
            	 handle.anchorScroll(false);
            },200);
           
            
         
        };
        $scope.isGroupShownX = function(group) {
//        	
            return $scope.shownGroupX === group;
        };

        //show the search result
        $scope.btnSearch = function(criteria) {
            $scope.search.items = [];
            if (!angular.equals(criteria.length, 0)) {
                ContactsService.searchContact(db, criteria, function(result) {

                    if (result.rows.length > 0) {
                        $scope.show = true;
                        $scope.search.empty = false;
                        for (var int = 0; int < result.rows.length; int++) {

                            $scope.search.items.push(result.rows.item(int));

                        }
                        if (!$scope.isGroupShown($scope.search)) {
                            $scope.toggleGroup($scope.search);
                        }

                    } else {
                        $scope.show = true;
                        $scope.search.empty = true;
                        if (!$scope.isGroupShown($scope.search)) {
                            $scope.toggleGroup($scope.search);
                        }
                    }
                });
            } else {
                LoadingService.error("Veuillez remplir le champ", "ContactListController");
            }
        };
        //next page groupe
        $scope.forwardgroups = function(i,element) {
//        	console.error($scope);
        	if ( $scope.groups[i].page < $scope.groups[i].nbr ) {
	        	$scope.groups[i].page = $scope.groups[i].page + 1;
	            var selectQuery = "SELECT * FROM contact where status != 'deleted' and list =='"+$scope.groups[i].name+"' order by date DESC LIMIT 20 OFFSET "+parseInt(20*($scope.groups[i].page-1))+";";
	            try {
	              $cordovaSQLite.execute(db, selectQuery).then(function(result) {
	                console.warn(selectQuery);
	                var count = 0;
	                $scope.groups[i].items = [];
	            	for (var int = 0; int < result.rows.length; int++) {
	    				var tmp= result.rows.item(int);
	            		$scope.groups[i].items.push(tmp);
	            	}
	            	$location.hash(element);
	                 var handle = $ionicScrollDelegate.$getByHandle('content');
	              
	                 handle.anchorScroll(false);
	              }, function(reason) {
	                console.log(reason);
	              }, function(value) {
	                console.warn(value);
	              });
	            } catch (e) {
	              // TODO: FIXME handle exception
	              return 0;
	            }
        	}
        };
        //prev page groupe
        $scope.rewindgroups = function(i,element) {
        	if ( $scope.groups[i].page > 1 ) {
	        	$scope.groups[i].page = $scope.groups[i].page - 1;
	            var selectQuery = "SELECT * FROM contact where status != 'deleted' and list =='"+$scope.groups[i].name+"' order by date DESC LIMIT 20 OFFSET "+parseInt(20*($scope.groups[i].page-1))+";";
	            try {
	              $cordovaSQLite.execute(db, selectQuery).then(function(result) {
	                console.warn(selectQuery);
	                var count = 0;
	                $scope.groups[i].items = [];
	            	for (var int = 0; int < result.rows.length; int++) {
	    				var tmp= result.rows.item(int);
	            		$scope.groups[i].items.push(tmp);
	            	}
	            	 $location.hash(element);
	                 var handle = $ionicScrollDelegate.$getByHandle('content');
	              
	                 handle.anchorScroll(false);
	              }, function(reason) {
	                console.log(reason);
	              }, function(value) {
	                console.warn(value);
	              });
	            } catch (e) {
	              // TODO: FIXME handle exception
	              return 0;
	            }
        	}
        };
        //next page
        $scope.forward = function(id) {
            switch (id) {
                case 0:
                    if ($scope.tabs[0].page < $scope.tabs[0].totalPages) {
                        ContactsService.selectContacts(db, ($scope.tabs[0].page + 1), function(result) {
                            $scope.tabs[0].items = [];
                            if (result.rows.length > 0) {
                                $scope.tabs[0].empty = false;
                                for (var int = 0; int < result.rows.length; int++) {

                                    $scope.tabs[0].items.push(result.rows.item(int));
                                    $scope.dynamicTimeStamp = new Date().getTime();
                                }
                                $scope.tabs[0].page++;
                            } else {
                                $scope.tabs[0].items.push({});
                                $scope.tabs[0].empty = true;
                            }
                            $location.hash('TousContact');
                            var handle = $ionicScrollDelegate.$getByHandle('content');
                          
                            handle.anchorScroll(false);
                        });
                    }
                    break;
                case 1:
                    if ($scope.tabs[1].page < $scope.tabs[1].totalPages) {
                        ContactsService.selectContacts(db, ($scope.tabs[1].page + 1), function(result) {

                            $scope.tabs[1].items = [];
                            if (result.rows.length > 0) {
                                $scope.tabs[1].empty = false;
                                for (var int = 0; int < result.rows.length; int++) {
                                    $scope.tabs[1].items.push(result.rows.item(int));
                                    $scope.dynamicTimeStamp = new Date().getTime();
                                }
                                $scope.tabs[1].page++;
                            } else {
                                $scope.tabs[1].items.push({});
                                $scope.tabs[1].empty = true;
                            }
                        $location.hash('Followers');
                            var handle = $ionicScrollDelegate.$getByHandle('content');
                          
                            handle.anchorScroll(false);
                        });
                    }
                    break;
            }
        };
        //previous page
        $scope.rewind = function(id) {
            switch (id) {
                case 0:
                    if ($scope.tabs[0].page > 1) {
                        ContactsService.selectContacts(db, ($scope.tabs[0].page - 1), function(result) {

                            $scope.tabs[0].items = [];
                            if (result.rows.length > 0) {
                                $scope.tabs[0].empty = false;
                                for (var int = 0; int < result.rows.length; int++) {

                                    $scope.tabs[0].items.push( result.rows.item(int));
                                }
                                $scope.tabs[0].page--;
                            } else {
                                $scope.tabs[0].items.push({});
                                $scope.tabs[0].empty = true;
                            }
                            $location.hash('TousContact');
                            var handle = $ionicScrollDelegate.$getByHandle('content');
                          
                            handle.anchorScroll(false);
                        });
                    }

                    break;
                case 1:
                    if ($scope.tabs[1].page > 1) {
                        ContactsService.selectContacts(db, ($scope.tabs[1].page - 1), function(result) {

                            $scope.tabs[1].items = [];
                            if (result.rows.length > 0) {
                                $scope.tabs[1].empty = false;
                                for (var int = 0; int < result.rows.length; int++) {
                                    $scope.tabs[1].items.push(result.rows.item(int));

                                }
                                $scope.tabs[1].page--;
                            } else {
                                $scope.tabs[1].items.push({});
                                $scope.tabs[1].empty = true;
                            }
                            $location.hash('Followers');
                            var handle = $ionicScrollDelegate.$getByHandle('content');
                          
                            handle.anchorScroll(false);
                        });
                    }
                    break;
            }
        };
        //Listener on search input 
        $scope.changeHandler = function(criteria) {

            if (angular.equals(criteria.length, 0)) {
                $scope.show = false;
            }

        };
        /**
         * return the total pages number
         */
        function guessPagesNumber(total) {
            var div = total / 20;
            if (parseInt(div) == div) {
                return div;
            } else {
                return parseInt(div + 1);
            }
        }

        //dismiss popup
        $scope.dismiss = function() {
            LoadingService.dismiss();
        };
    }
]);