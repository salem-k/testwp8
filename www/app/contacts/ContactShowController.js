appContext.controller("ContactShowController", [
    '$scope',
    '$state',
    'ContactsService',
    '$ionicPlatform',
    '$cordovaSQLite',
    '$stateParams',
    '$rootScope',
    'cameraService','$ionicHistory','$ionicModal','$ionicSlideBoxDelegate','ConnectionService','LoadingService','MenuService',
    function($scope, $state, ContactsService, $ionicPlatform, $cordovaSQLite,
            $stateParams, $rootScope, cameraService,$ionicHistory,$ionicModal,$ionicSlideBoxDelegate,ConnectionService,LoadingService,MenuService) {
      $scope.showLast = false;
      $scope.tmp=false;
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
      
       // $ionicHistory.clearHistory();
        getContact();
      });

      /**
       * get infos contact by id
       */
      function getContact() {
    	  // $scope.photoProfil = "img/photo_top_title.jpg";
        ContactsService.getContactbyId(db, $stateParams.id, function(result) {
        	if(result.rows.length > 0){
        		tmpContact = result.rows.item(0);
                $scope.contact = result.rows.item(0);
                $scope.contact.last_name = removeSlashes(result.rows.item(0).last_name);
                $scope.contact.first_name = removeSlashes(result.rows.item(0).first_name);
                $scope.contact.company = removeSlashes(result.rows.item(0).company);
                $scope.contact.list = removeSlashes(result.rows.item(0).list);
                $scope.contact.lastsendemail =result.rows.item(0).lastsendemail;
                $scope.photoProfil = result.rows.item(0).photofilelocation;
//                alert("db "+result.rows.item(0).photofilelocation);
                //test sur le premier e dernier buzz
                if(result.rows.item(0).lastsendemail !="")
              	  $scope.showLast = true;
                var idProfil = $rootScope.idProfil;
               // LoadingService.loading("Chargement..."); 
                $scope.tmp=true;
            
//                ContactsService.downloadPhotoContact($scope.contact.id,function(url) {
//                          $scope.photoProfil = url+ '?' + new Date().getTime(); // "img/photo_top_title.jpg";
//                          LoadingService.dismiss();
//                        });
                console.log(JSON.stringify($scope.contact));
                $scope.contact.rendez_vous = new Date(result.rows.item(0).rendez_vous * 1000);
                if ( $scope.contact.rendez_vous == '01/01/1900'
                        ||  $scope.contact.rendez_vous == '01/01/1970') {

                	 $scope.contact.rendez_vous = '';
                };
                if ( Object.prototype.toString.call($scope.contact.rendez_vous) === "[object Date]" ) {
                  // it is a date
                  if ( isNaN( $scope.contact.rendez_vous.getTime() ) ) { 
                    // date is not valid
                    $scope.contact.rendez_vous="";
                  }
                  else {
                    // date is valid
                  }
                }
                else {
                  // not a date
                }
        	}else{
        		MenuService.setLocalStorage('ReloadContactList',1);
        		$state.go('app.contactList');
        	}
          
        });
      };
      
      $ionicModal.fromTemplateUrl('app/common/partials/imagepopup.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });
     
        $scope.openModal = function() {
        	console.log('open modal');
          $scope.modal.show();
          // Important: This line is needed to update the current ion-slide's width
          // Try commenting this line, click the button and see what happens
          $ionicSlideBoxDelegate.update();
        };

     
        $scope.closeModal = function() {
          $scope.modal.hide();
         
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
          $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function() {
          // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
          // Execute action
        });
        $scope.$on('modal.shown', function() {
          console.log('Modal is shown!');
        });
      
       
      
        $scope.updateAndShowContact =function(id,email){
//        	/**€€€€€€€
//             *  begin synchronisation
//             €€€€€€€*/
//        		LoadingService.loading("Synchronisation...");
//                ConnectionService.isConnectedWithoutSync(db, function() {
//                	console.log(id.toString().length)
//                	if (id.toString().length != 10) {
//                	ContactsService.getContactFromServerByEmail(email,function(contact){
//                		console.log("there is contact")
//                		ContactsService.getContactbyId(db,contact.id,function(result){
//	                			if(result.rows.length >0){
//	                				if(ContactsService.isUpToDate(result.rows.item(0).modificationdate,contact.modificationdate )){
//	                					//le contact est à jour
        								$rootScope.fromState = "app.contactShow";
	                					$state.go('app.contactEdit', {id: id });
//	                				}else{
//	                					//le contact sera mit à jour
//	                					console.log(contact);
//	                            		console.log("++++++++");
//	                            		ContactsService.updateContactModificationDate(db,id,contact.modificationdate, function(){
//	                            		ContactsService.updateContactInfo(db,contact,function(){
//	                            			 // empty group table
//	                                        ContactsService.emptyGroupTable(db, function() {
//	                                            // get data from server
//	                                            ContactsService.getGroup().success(function(data, status, headers, config) {
//	                                            	ContactsService.downloadAndOverride($stateParams.id,function(urlImage,i){
//	                                            		ContactsService.updateContactPhoto(db,$stateParams.id,urlImage,function(){
//	                                            			//rafraichir la page contact list
//	                                            			console.log("+++++=======++++++++++++++");
//	                                            			MenuService.setLocalStorage('ReloadContactList',1);
//	                                            		if (data.lists.list instanceof Array) {
//	                                                        for (var int = 0; int < data.lists.list.length; int++)
//	                                                        // insert into group table
//	                                                            ContactsService.insertIntoGroupTable(db, data.lists.list[int], function() {
//	                                                            	//go to contact Edit without update
//	                                                            	LoadingService.dismiss();
//	                                                            	$state.go('app.contactEdit', {id: Number(contact.id) });
//	                                                    			
//	                                                            });
//	                                                        // LoadingService.loading("Chargement des groupes...");
//	                                                    } else ContactsService.insertIntoGroupTable(db, data.lists.list, function() {
//	                                                    	//go to contact Edit without update
//	                                                    	LoadingService.dismiss();
//	                                                    	$state.go('app.contactEdit', {id: Number(contact.id) });
//	                                                    });
//	                                            	});
//	                                            	});
//	                                            }).error(function(data, status, headers, config) {
//	                                                console.log("error " + status);
//	                                                // TODO FIXME
//	                                            });
//	
//	                                        });
//	                            		});//========
//	                				});//========
//	                				}
//	                			}else{
//                				LoadingService.error("La connexion est insuffisante ou saturée. <br> Veuillez réessayer ultérieurement.","ContactShowController");
//                				
//                			}
//                		});
//                		
//                	},function(status){
//                		if("NOCONTACT" == status){
//                			console
//                			console.log("there is no contact");
//                			LoadingService.errorWithTreatment("ce contact n'existe plus dans le serveur","ContactShowController",id);
//                		}else{
//                			//go to contact Edit without update
//                    		LoadingService.dismiss();
//                    		$state.go('app.contactEdit', {id: id });
//                		}
//                		
//                		
//                	});
//                }
//                	LoadingService.dismiss();
//                	//go to contact Edit (there is no connection)
//                	$state.go('app.contactEdit', {id: id })
//                }, function() {
//                	// no connection
//                	LoadingService.dismiss();
//                	//go to contact Edit (there is no connection)
//                	$state.go('app.contactEdit', {id: id })
//                });
//            /**€€€€€€€
//             *  end synchronisation
//             €€€€€€€*/

        };
        
        $scope.dismiss = function(){
        	LoadingService.dismiss();
        	$state.go('app.contactList');
        };
        
        $scope.treatment = function(id){
        	ContactsService.deleteContactLocal(db,id,function(){
        		MenuService.setLocalStorage('ReloadContactList',1);
        		LoadingService.dismiss();
        		$state.go('app.contactList')
        	});
        };

    }]);
