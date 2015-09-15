appContext.controller("SynchroController", [
    '$state',
    '$cordovaSQLite',
    '$ionicPlatform',
    'ContactsService',
    'LoadingService',
    'BuzcardService',
    '$scope',
    '$rootScope',
    '$ionicHistory',
    'SynchroServices',
    'LoginService',
    'MenuService',
    function($state, $cordovaSQLite, $ionicPlatform, ContactsService, LoadingService, BuzcardService, $scope, $rootScope, $ionicHistory, SynchroServices, LoginService,MenuService) {

        /**
         * create/open DB
         */
    	var db = null;
        $ionicPlatform.ready(function() {
        	
            LoadingService.loading("Chargement du profil...");

            if (window.cordova) {
                db = $cordovaSQLite.openDB("buzcard.db"); // device
            } else {
                db = window.openDatabase("buzcard.db", '1', 'my', 1024 * 1024 * 10); // browser
            };

            SynchroServices.createRequestTable(db, function() {
                // create profil table
                BuzcardService.createProfileTable(db, function() {
                    BuzcardService.emptyProfileTable(db, function() {
                        // insert data to profile table
                        BuzcardService.getProfil().success(function(data, status, headers, config) {

                            var profil = data.response.virtual_card;
                        	console.error(data);

                            $rootScope.fileLocaltion = profil.photofilelocation.substr(2, profil.photofilelocation.lastIndexOf('/') - 1);

                            $rootScope.idProfil = profil.id;

                            BuzcardService.insertIntoProfile(db, data.response.virtual_card, function() {

                                LoadingService.loading("Chargement de la photo...");
                                BuzcardService.downloadPhotoProfil(profil.photofilelocation, profil.id, function(url) {


                                    // create group table
                                    ContactsService.createGroupTable(db, function() {
                                        // empty group table
                                        ContactsService.emptyGroupTable(db, function() {
                                            // get data from server
                                        	ContactsService.getGroup().success(function(data, status, headers, config) {
                                        		
                                        		if (typeof data.lists.list == "undefined") {
                                        		} else {
                                        			
                                        			if (data.lists.list instanceof Array) {
                                        				// insert into group table
                                        					ContactsService.insertBulkGroupe(db, data.lists.list, function() {});
                                        			} else ContactsService.insertIntoGroupTable(db, data.lists.list, function() {});
                                        		}
                                        		console.log("1111111");
                                        	}).error(function(data, status, headers, config) {
                                        		console.log("error " + status);
                                        		// TODO FIXME
                                        	});

                                        });
                                    });



                                    // create contacts table
                                    ContactsService.createContactsTable(db, function() {
                                        //empty contact table
                                        ContactsService.emptyContactTable(db, function() {
                                        	 LoadingService.dismiss();
                                            LoadingService.loading("Chargement des contacts...");
                                            //get from server and persist 
                                            getContactsRecurssive(1, function() {
                                                LoginService.createIdentifiantTable(db, function() {
                                                    LoginService.emptyIdentifiantTable(db, function() {
                                                        if ($rootScope.email != "" && $rootScope.password != "") {
                                                        	ContactsService.downloadAllPhotoContacts(db,function(){
                                                            
                                                            	ContactsService.getCreditParrainage(function(credit){
                                                            		MenuService.setLocalStorage("credit",credit);
                                                            		var dateSynchronisation = MenuService.getDateUS();
                                                            		MenuService.setLocalStorage("dateSynchronisation",dateSynchronisation);
                                                            		LoginService.setCredentials(db, $rootScope.email, $rootScope.password,$rootScope.userId, function() {
                                                            			BuzcardService.getCustoFile(db,function(array){
                                                            				if("404" != array){
                                                            					console.log(array[2]);
                                                            					BuzcardService.downloadPhotoCusto(array[2],"custo",function(imgUrl){
                                                            						MenuService.setLocalStorage("customisation",array);
                                                                					LoadingService.dismiss();
//                                                                        	    	$ionicHistory.nextViewOptions({
//                                                                                        disableBack: true
//                                                                                    });
                                                                                    //$ionicHistory.clearHistory();
                                                                                    $state.go("app.buzcard");
                                                            					});
                                                            					
                                                            				}else{
                                                            					
                                                            					LoadingService.dismiss();
//                                                                    	    	$ionicHistory.nextViewOptions({
//                                                                                    disableBack: true
//                                                                                });
                                                                                //$ionicHistory.clearHistory();
                                                                                $state.go("app.buzcard");
                                                            				}
                                                            				
                                                            				
                                                            			});
                                                            			
                                                                 });
                                                            		
                                                            	});
                                                            	
                                                                
                                                            });
                                                        }
                                                    });
                                                });
                                            });
                                        });

                                    });


                                }); //End Download photo

                            }); //End insert profil 


                        });
                    });
                });
            });
        });




        /**
         * get all contact recursively from server and persist them to DB 
         */
        function getContactsRecurssive(page, callBack) {

            // get data from server
            ContactsService.getContacts(page).success(function(data, status, headers, config) {
            	
            	if(typeof data.contacts.contact == "undefined"){
            		 return callBack();
            	}else{
            		 var pages = data.contacts.pages;
                     if (page < pages - 1) {
                         page = parseInt(page) + 1;


                         ContactsService.insertBulkIntoContactsTable(db, 0, data.contacts.contact, function() {
                             LoadingService.loading("Chargement des contacts : " + parseInt((page / pages) * 100) + "%");
                         });

                         getContactsRecurssive(page, callBack);
                     } else {
                         ContactsService.insertBulkIntoContactsTable(db, 0, data.contacts.contact, function() {
                            
                        	 return callBack();
                         });
                     }
            	}
               
            }).error(function(data, status, headers, config) {
                console.log("error " + status);
                // TODO FIXME
            });
        }

    }
]);