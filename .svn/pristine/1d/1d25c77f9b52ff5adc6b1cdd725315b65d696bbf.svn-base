appContext.controller("LoadingController", [
    '$scope',
    '$state',
    'LoginService',
    '$ionicPlatform',
    '$cordovaSQLite',
    'LoadingService',
    '$ionicHistory', 'MenuService', '$rootScope', 'BuzcardService', 'ContactsService', 'ConnectionService',
    function($scope, $state, LoginService, $ionicPlatform, $cordovaSQLite, LoadingService, $ionicHistory, MenuService, $rootScope, BuzcardService, ContactsService, ConnectionService) {

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

            LoadingService.loading("Chargement...");
            LoginService.selectCredentials(db, function(result) {
                if (result == 1) {
                    LoadingService.dismiss();
                    window.localStorage.removeItem('dateSynchronisation');
                    $state.go("app.login");
                } else {
//                    LoadingService.dismiss();
                    if (result.rows.length > 0) {
                    	 LoadingService.dismiss();
                        $state.go("app.buzcard");
//                        // redirection to the buzcard page
//                        // $location.url("/app/buzcard");
//                        var dateSynchronisation = MenuService.getLocalStorage("dateSynchronisation");
//                        if (dateSynchronisation != false) {
//
//                            ConnectionService.isConnected(db, function() {
//
//                                BuzcardService.getProfil().success(function(data, status, headers, config) {
//                                    if (data != "") {
//                                        var profil = data.response.virtual_card;
//                                        $rootScope.fileLocaltion = profil.photofilelocation.substr(2, profil.photofilelocation.lastIndexOf('/') - 1);
//                                        $rootScope.idProfil = profil.id;
//
//                                        BuzcardService.updateProfil(db, data.response.virtual_card, function() {
//
//                                            LoadingService.loading("Chargement de la photo...");
//                                            BuzcardService.downloadPhotoProfil(profil.photofilelocation, profil.id, function(url) {
//                                            LoadingService.loading("Chargement des contacts...");
//                                            //get from server and persist 
//                                            ContactsService.getContactsEdited().success(function(data, status, headers, config) {
//                                                var nbContacts =0;
//                                                if(data.contacts.contact instanceof Array)
//                                                nbContacts = data.contacts.contact.length;
//                                                else if (data.contacts.contact instanceof Object)
//                                                nbContacts = 1;
//                                                if (nbContacts == 0) {
//                                                	
//                                                    var dateSynchronisation = MenuService.getDateUS();
//                                                    MenuService.setLocalStorage("dateSynchronisation", dateSynchronisation);
//
//                                                    $ionicHistory.nextViewOptions({
//                                                        disableBack: true
//                                                    });
//                                                    $ionicHistory.clearCache();
//                                                    $ionicHistory.clearHistory();
//                                                    // $state.go("app.buzcard");
//                                                    $location.url("/app/buzcard");
//
//                                                } else {
//                                                    ContactsService.insertOrUpdateContacts(db, 0, nbContacts, data.contacts.contact, function() {
//                                                        // empty group table
//                                                        ContactsService.emptyGroupTable(db, function() {
//                                                            // get data from server
//                                                            ContactsService.getGroup().success(function(data, status, headers, config) {
//
//                                                                if (data.lists.list instanceof Array) {
//                                                                    for (var int = 0; int < data.lists.list.length; int++)
//                                                                    // insert into group table
//                                                                        ContactsService.insertIntoGroupTable(db, data.lists.list[int], function() {});
//                                                                    LoadingService.loading("Chargement des groupes...");
//                                                                } else ContactsService.insertIntoGroupTable(db, data.lists.list, function() {});
//                                                            }).error(function(data, status, headers, config) {
//                                                                console.log("error " + status);
//                                                                // TODO FIXME
//                                                            });
//
//                                                        });
//
//                                                        ContactsService.getCreditParrainage(function(credit) {
//                                                            MenuService.setLocalStorage("credit", credit);
//                                                            var dateSynchronisation = MenuService.getDateUS();
//                                                            MenuService.setLocalStorage("dateSynchronisation", dateSynchronisation);
//
//                                                            $ionicHistory.nextViewOptions({
//                                                                disableBack: true
//                                                            });
//                                                            $ionicHistory.clearCache();
//                                                            $ionicHistory.clearHistory();
//                                                            //  $state.go("app.buzcard");
//                                                            $location.url("/app/buzcard");
//                                                        });
//
//                                                    });
//
//                                                }
//
//                                            }).error(function(data, status, headers, config) {
//                                                console.log("error " + status);
//                                                // TODO FIXME
//                                            });
//
//                                            /** -+-+-+-+-+-+ */
//
//                                          });
//                                        });
//                                    } else {
//                                        LoadingService.loading("Chargement des contacts...");
//                                        //get from server and persist 
//                                        ContactsService.getContactsEdited().success(function(data, status, headers, config) {
//                                            var nbContacts =0;
//                                            if(data.contacts.contact instanceof Array)
//                                            nbContacts = data.contacts.contact.length;
//                                            else if (data.contacts.contact instanceof Object)
//                                            nbContacts = 1;
//                                            if (nbContacts == 0) {
//
//                                                var dateSynchronisation = MenuService.getDateUS();
//                                                MenuService.setLocalStorage("dateSynchronisation", dateSynchronisation);
//
//                                                $ionicHistory.nextViewOptions({
//                                                    disableBack: true
//                                                });
//                                                $ionicHistory.clearCache();
//                                                $ionicHistory.clearHistory();
//                                                // $state.go("app.buzcard");
//                                                $location.url("/app/buzcard");
//
//                                            } else {
//
//                                                ContactsService.insertOrUpdateContacts(db, 0, nbContacts, data.contacts.contact, function() {
//
//                                                    // empty group table
//                                                    ContactsService.emptyGroupTable(db, function() {
//                                                        // get data from server
//                                                        ContactsService.getGroup().success(function(data, status, headers, config) {
//
//                                                            if (data.lists.list instanceof Array) {
//                                                                for (var int = 0; int < data.lists.list.length; int++)
//                                                                // insert into group table
//                                                                    ContactsService.insertIntoGroupTable(db, data.lists.list[int], function() {});
//                                                                LoadingService.loading("Chargement des groupes...");
//                                                            } else ContactsService.insertIntoGroupTable(db, data.lists.list, function() {});
//                                                        }).error(function(data, status, headers, config) {
//                                                            console.log("error " + status);
//                                                            // TODO FIXME
//                                                        });
//
//                                                    });
//
//
//                                                    ContactsService.getCreditParrainage(function(credit) {
//                                                        MenuService.setLocalStorage("credit", credit);
//                                                        var dateSynchronisation = MenuService.getDateUS();
//                                                        MenuService.setLocalStorage("dateSynchronisation", dateSynchronisation);
//
//                                                        $ionicHistory.nextViewOptions({
//                                                            disableBack: true
//                                                        });
//                                                        $ionicHistory.clearCache();
//                                                        $ionicHistory.clearHistory();
//                                                        // $state.go("app.buzcard");
//                                                        $location.url("/app/buzcard");
//                                                    });
//
//                                                });
//
//                                            }
//
//                                        }).error(function(data, status, headers, config) {
//                                            console.log("error " + status);
//                                            // TODO FIXME
//                                        });
//
//                                    }
//
//
//                                }).error(function(data, status, headers, config) {
//                                    console.log("error " + status);
//                                    // TODO FIXME
//                                });
//
//                            }, function() {
//                                $ionicHistory.nextViewOptions({
//                                    disableBack: true
//                                });
//                                $ionicHistory.clearCache();
//                                $ionicHistory.clearHistory();
//                                //$state.go("app.buzcard");
//                                $location.url("/app/buzcard");
//                            });
//                            /** -+-+-+-+-+-+ */
//
//                        } else {
//                            // $state.go("app.buzcard"); 
//                            $location.url("/app/buzcard");
//                        }
//
                    } else {
                        LoadingService.dismiss();
                        $state.go("app.login");
                    }
                }

            });
        });


        // to dismiss the PopUp
        $scope.dismiss = function() {
            LoadingService.dismiss();
        };

    }
]);