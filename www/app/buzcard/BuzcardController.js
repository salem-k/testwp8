appContext.controller('BuzcardController', [
	'$ionicSideMenuDelegate',
    'BuzcardService',
    'cameraService',
    '$scope',
    '$state', 
    '$ionicPlatform',
    '$cordovaSQLite',
    '$rootScope',
    'LoadingService','$ionicHistory','$ionicModal','$ionicSlideBoxDelegate','MenuService','ConnectionService',
    function($ionicSideMenuDelegate,BuzcardService, cameraService, $scope, $state, $ionicPlatform,
            $cordovaSQLite, $rootScope,LoadingService,$ionicHistory,$ionicModal,$ionicSlideBoxDelegate,MenuService,ConnectionService) {
        
      var db = null;
      

      $ionicPlatform.ready(function() {
    	  
    	  	$ionicSideMenuDelegate.canDragContent(false);
    	  	
	        /**
	         * create/open DB
	         */
	        if (window.cordova) {
	          db = $cordovaSQLite.openDB("buzcard.db"); // device
	        } else {
	          db = window.openDatabase("buzcard.db", '1', 'my', 1024 * 1024 * 10); // browser
	        }
	        //---------------
	     
	         //---------------
	       
      });
      
      $scope.$on('$ionicView.beforeEnter', function() {	
    	  var isWindowsPhone = ionic.Platform.isWindowsPhone();
	      
    	  if(MenuService.getLocalStorage("customisation")){
         	  $rootScope.isCusto = true;
         	  var arrayCusto = MenuService.getLocalStorage("customisation");
               $scope.secondColor = "1px solid "+arrayCusto[4];
               $scope.firstColor = arrayCusto[3];
               if (isWindowsPhone) {
            	   $rootScope.imgCusto = MenuService.getLocalStorage("imgCusto");   
               }else{
            	   $rootScope.imgCusto = MenuService.getLocalStorage("imgCusto")+"?"+new Date().getTime();	   
               }
    	  }
    	  showInfos();
      });
      /**
       * get infos profil
       */
      // TODO FIXME ng-repeat view buzcard.html
      function showInfos() {

    	//avant d'afficher la page afficher la page loading
        BuzcardService.selectProfile(db, function(result) {
          // TODO FIXME ng-repeat view buzcard
        	if(result.rows.length >0){
        		var profil = result.rows.item(0);
        		$scope.infos = profil;
                $scope.infos.address= profil.address_line_1 +' '+profil.address_line_2+' '+
                profil.address_line_3+' '+profil.postal_code+' \n '+profil.city+' '+profil.country;
                if (profil.photolocation != "") {
                	$rootScope.fileLocaltion = profil.photolocation.substr(2,
                          profil.photolocation.lastIndexOf('/') - 1);
                }
                $rootScope.idProfil = profil.id;
                cameraService.checkExistFile( 'imgThumbnail.jpg',function(url) {
                	if(url =="img/photo_top_title.jpg" ){
                		 $scope.photoProfil =  "img/photo_top_title.jpg";
                	}else{
                		  var isWindowsPhone = ionic.Platform.isWindowsPhone();
                		  if(isWindowsPhone){
                			  $scope.photoProfil = url; // "img/photo_top_title.jpg";
                		  }else{
                			  $scope.photoProfil = url + '?' + new Date().getTime(); // "img/photo_top_title.jpg";	  
                			  
                		  }
                		 
                	}
                         
                });
        	}

        });

      };
      $scope.getlink_1 = function(){
			
				window.open($scope.infos.link_1, '_system');
		
      };
	   $scope.getlink_2 = function(){
			
				window.open($scope.infos.link_2, '_system');
		
	  };
	  $scope.getlink_3 = function(){
			
				window.open($scope.infos.link_3, '_system');
			
	  };
      $scope.getlink_4 = function(){
			
				window.open($scope.infos.link_4, '_system');
		
      };
      
      $scope.clickReseauxSociaux = function(linkRx){
    	  var prefix = 'http://';
    	  if (!linkRx.match(/^[a-zA-Z]+:\/\//)){
    		  linkRx = prefix + linkRx;
    	  }
    	  console.log(linkRx);
				window.open(linkRx, '_system', 'location=yes');
			
      }
      
      /**
       * show popup photo de profil 
       */
        $ionicModal.fromTemplateUrl('app/common/partials/imagepopup.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.modal = modal;
          });

          $scope.openModal = function() {
            $scope.modal.show();
          };

          $scope.closeModal = function() {
            $scope.modal.hide();
          };

          //Cleanup the modal when we're done with it!
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

          $scope.showImage = function() {
            $scope.openModal();
          }
          
         /**
          * 
          */ 
        $scope.updateAll = function(){
	    	 /**€€€€€€€
	         *  begin synchronisation
	         €€€€€€€*/
            LoadingService.loading("Synchronisation serveur en cours...");
            var dateSynchronisation = MenuService.getLocalStorage("dateSynchronisation");
            if (dateSynchronisation != false) {

                ConnectionService.isConnected(db, function() {

                    BuzcardService.getProfil().success(function(data, status, headers, config) {
                        if (data != "") {
                            var profil = data.response.virtual_card;
                            console.log(profil);
                            $rootScope.fileLocaltion = profil.photofilelocation.substr(2, profil.photofilelocation.lastIndexOf('/') - 1);
                          
                            
                            $rootScope.idProfil = profil.id;

                            BuzcardService.updateProfil(db, data.response.virtual_card, function() {

                                BuzcardService.downloadPhotoProfil(profil.photofilelocation, profil.id, function(url) {
                                    $state.go("app.buzcardEdit");
//                                    $location.url("/app/buzcardEdit");
                                });
                            });
                        } else {
                            console.log("data empty");
                            var photoLocation = $scope.infos.photolocation;
                            var idProfil = $rootScope.idProfil;
                            // photolocation
                            console.log(photoLocation+"  "+idProfil);
                            BuzcardService.downloadPhotoProfil(photoLocation, idProfil, function(url) {
                                $state.go("app.buzcardEdit");
//                                $location.url("/app/buzcardEdit");
                            });
                        }


                    }).error(function(data, status, headers, config) {
                        console.log("error " + status);
                        // TODO FIXME
                    });

                }, function() {
                	LoadingService.dismiss();
                    $state.go("app.buzcardEdit");
//                    $location.url("/app/buzcardEdit");
                });

            } else {
            	console.log("date sychro : false");
                $state.go("app.buzcardEdit");
//                $location.url("/app/buzcardEdit");
            }

            /**€€€€€€€
             * end
             €€€€€€€*/
        }
          
    }]);