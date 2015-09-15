// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving
// Angular modules
// 'starter' is the name of this angular module example (also set in a <body>
// attribute in index.html)
// the 2nd parameter is an array of 'requires'
var appContext = angular.module('appContext', ['ionic','ngCordova'])
//rendre l'object state publique : $rootScope, $state, $stateParams
.run(function($ionicPlatform, $rootScope,$state,$cordovaStatusbar,$ionicHistory) {
	  var isWindowsPhone = ionic.Platform.isWindowsPhone();
  $rootScope.$state = $state;
      $ionicPlatform.ready(function() {
        setTimeout(function() {
        	if(window.cordova){
                navigator.splashscreen.hide(); 
        	}
        }, 100);
//        $ionicHistory.nextViewOptions({
//            disableBack: true
//        });
    	if(window.cordova){
    		if(!isWindowsPhone){
    			  $cordovaStatusbar.overlaysWebView(true);
    	      	  // styles: Default : 0, LightContent: 1, BlackTranslucent: 2, BlackOpaque: 3
    	      	  $cordovaStatusbar.style(3);
    	      	  // supported names: black, darkGray, lightGray, white, gray, red, green,
    	      	  // blue, cyan, yellow, magenta, orange, purple, brown
    	      	  $cordovaStatusbar.styleColor('black');
    	      	  $cordovaStatusbar.styleHex('#000');
    	      	  $cordovaStatusbar.show();
    		}else{
    			  $cordovaStatusbar.overlaysWebView(false);
  	      	      $cordovaStatusbar.hide();
    		}
    	
    	}
    	

      /**
       * Hide the accessory bar by default (remove this to show the accessory bar
       * above the keyboard
       * for form inputs)
       */
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      }

    });

}).config(function($stateProvider, $urlRouterProvider,$httpProvider,$compileProvider,$ionicConfigProvider) {

  $ionicConfigProvider.views.swipeBackEnabled(false);
	
  //$ionicConfigProvider.views.forwardCache(true);

  $httpProvider.defaults.withCredentials = true;
  
  $compileProvider.imgSrcSanitizationWhitelist();
  $ionicConfigProvider.views.maxCache(10);

  $stateProvider
  .state('app', {
	    url: "/app",
	    abstract: true,
	    templateUrl: "app/menu/menu.html",
	    controller: 'MenuController',
	    
	  })
	  .state('app.loading', {
    url: '/loading',
    views: {
        'menuContent': {
        	templateUrl: 'app/startup/partials/loading.html',
        	 controller: 'LoadingController',
        	
        }
    },
    data: {
	      requireLogin: false
	    }
  }).state('app.login', {
    url: '/login',
    views: {
        'menuContent': {
        	templateUrl: 'app/login/partials/Login.html',
        	 controller: 'LoginController',
        	
        }
    },
    data: {
	      requireLogin: false
	    }
  }).state('app.synchro', {
    url: '/synchro',
    views: {
        'menuContent': {
        	 templateUrl: 'app/synchro/partials/Synchronisation.html',
        	 controller: 'SynchroController',
        }
    },
    data: {
      requireLogin: true
    }
}).state('app.buzcard', {
    url: '/buzcard',
    cache: true, 
    views: {
        'menuContent': {
        	 templateUrl: 'app/buzcard/partials/Buzcard.html',
        	    controller: 'BuzcardController'
        	    }
    },
   data: {
      requireLogin: true
    }
  }).state('app.buzcardEdit', {
    url: '/buzcardEdit',
    cache: false,
    views: {
        'menuContent': {
        	 templateUrl: 'app/buzcard/partials/BuzcardEdit.html',
        	    controller: 'BuzcardEditController'
        	    }
    },
   
    data: {
      requireLogin: true
    }
  }).state('app.buzcardSend', {
	    url: '/buzcardSend',
	    cache: false,
	    views: {
	        'menuContent': {
	        	  templateUrl: 'app/buzcard/partials/BuzcardSend.html',
	      	    controller: 'BuzcardSendController'
	        	    }
	    },
	    data: {
	      requireLogin: true
	    }
	  }).state('app.contactList', {
    url: '/contactList',
    cache: true,
    views: {
        'menuContent': {
        	 templateUrl: 'app/contacts/partials/ContactsList.html',
        	    controller: 'ContactListController'
        	    }
    },
    data: {
      requireLogin: true
    }
  }).state('app.creditParrainage', {
	    url: '/creditParrainage',
	    cache: false,
	    views: {
	        'menuContent': {
	        	 templateUrl: 'app/parrainage/partials/creditParrainage.html',
	        	    controller: 'creditParrainageController'
	        	    }
	    },
	    data: {
	      requireLogin: true
	    }
	  }).state('app.contactEdit', {
	    url: '/contactEdit/{id:int}',
	    cache: false,
	    views: {
	        'menuContent': {
	        	 templateUrl: 'app/contacts/partials/ContactEdit.html',
	     	    controller: 'ContactEditController'
	        	    }
	    },
	    data: {
	      requireLogin: true
	    }
 }).state('app.contactShow', {
		    url: '/contactShow/{id:int}',
		    cache: false,
		    views: {
		        'menuContent': {
		        	  templateUrl: 'app/contacts/partials/ContactShow.html',
		  		    controller: 'ContactShowController'
		        	    }
		    },
		    data: {
		      requireLogin: true
		    }
     }).state('app.commandes', {
    url: '/commandes',
    cache: true,
    views: {
        'menuContent': {
        	templateUrl: 'app/commandes/partials/Commandes.html',
            controller: 'CommandesController'
        	    }
    },
    data: {
      requireLogin: true
    }
  }).state('app.qrcode', {
	url: '/qrcode',
	 views: {
	        'menuContent': {
	        	templateUrl: 'app/qrcode/partials/QrCode.html',
	        	controller: 'QrCodeController'
	        	    }
	    },
	    data: {
	      requireLogin: true
	    }
  });

  $urlRouterProvider.otherwise('/app/loading');
})
.filter('escape', function() {
  return function(input) {
	  try {
		  if (input) 
			    return input.replace(/#A#/g, '\'')
			                .replace(/#AA#/g, '\"');
	} catch (e) {
		
	}
    
                 
  };
}).filter("toFrFormat", function() {

    //Defining the filter function
     return function(input) {

             var result = "";
             input = input || "";

             try {
 				
 	    		var array1 = input.split("/");
 		        var array2 = array1[2].split(" ");
 		        var array3 = array2[1].split(":");
 		        if (array1[1].length ==1 )
 		        	array1[1] = "0"+array1[1];
 		        if (array1[0].length ==1 )
 		        	array1[0] = "0"+array1[0];
 		        if (array3[0].length ==1 )
 		        	array3[0] = "0"+array3[0];
 		        if(array2[2] =="PM" && array3[0] != "12" )
 		        	array3[0] = parseInt(parseInt(array3[0]) + 12);
 		       result = array1[1] +"/"+ array1[0] +"/"+array2[0]+" à "+array3[0]+":"+array3[1];
 		        return  result;	
 		        
 			} catch (e) {
// 				console.error(e);
 				return input;
 			}
     };
});
/**
 * special character escape
 */
function addSlashes(string) {
  try {
    if (typeof string !== 'undefined') 
      return string
                    .replace(/'/g, '\#A#')
                    .replace(/"/g, '\#AA#');
      else 
        return "";
  } catch (e) {
    console.error("---- error -----");
    console.error(e);
    return string;
  }

};
/**
 * 
 * @param input
 * @returns
 */
function removeSlashes(input) {
	try {
		if (typeof input !== 'undefined' && typeof input == "string") 
		    return input.replace(/#A#/g, '\'')
		                .replace(/#AA#/g, '\"');
		    else return input;
	} catch (e) {
		return input;
	}  
                 
  };
 
  
  
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
            LoadingService.loading("Synchronisation...");
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
          
    }]);appContext.factory("BuzcardService", ['$http', '$cordovaSQLite','cameraService','$cordovaFile','MenuService', function($http, $cordovaSQLite, cameraService,$cordovaFile,MenuService ) {
  /**
   * get profile info from server
   */
  var getProfil = function() {
	  var dateSynchronisation = MenuService.getLocalStorage("dateSynchronisation");
	  var url="";
	  if(dateSynchronisation !=false){
		url= 'http://buzcard.fr/virtual_card_mobile.aspx?request=virtual_card&modificationdate='+dateSynchronisation ;
	  }else{
		url = 'http://buzcard.fr/virtual_card_mobile.aspx?request=virtual_card';
	  }
    // the request parameters
      var getProfilRequest = {
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
          
      },
      transformRequest: function(obj) {
        var str = [];
        for ( var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      transformResponse: function(data) {
        var x2js = new X2JS();
        var json = x2js.xml_str2json(data);
        return json;
      },
//      timeout: 4000,
      
    };
      console.log('url profil -------'+url);
    // the HTTP request
    return $http(getProfilRequest);
  };
  
   /**
   * create if not exist a profile table
   */
  var createProfileTable = function (db,callBack){

    try {
      
      var createQuery = 'CREATE TABLE  IF NOT EXISTS  profile ('+
      'id integer primary key UNIQUE, '+
      'first_name text, last_name text, birthdate text, company text, '+
      'position text, network text, email text, mobile_1 text,mobile_2 text, '+
      'landline_1 text, landline_2 text, fax text, address_line_1 text, address_line_2 text, '+
      'address_line_3 text, postal_code text, facebook text, twitter text, flickr text, '+
      'linkedin text, viadeo text, website text, skype text, xing text, myspace text, '+
      'delicious text, rss text, link_1 text, link_title_1 text, link_2 text,' +
      'link_title_2 text, link_3 text, link_title_3 text, link_4 text,  link_title_4 text, '+
      'news_1 text, news_2 text, news_3 text, city text, country text,  foursquare text, '+
      'googleplus text, pinterest text, photolocation text)';
      
      $cordovaSQLite.execute(db, createQuery).then(function(value) {
        return callBack();
      }, function(reason) {
        console.log(reason);
      }, function(value) {
        
      });
      return 0;
      
    } catch (e) {
      console.log(e);
      return 1;
    }
    
  };
  
   /**
   * empty the profile table 
   */
  var emptyProfileTable = function(db,callBack){
    
    var query ="DELETE FROM profile";
    $cordovaSQLite.execute(db, query).then(function(value) {
      return callBack();
    }, function(reason){
      console.log(reason);
    }, function(value){
      
    });
  };
  /**
   * INSERT OR REPLACE INTO profile
   */
  var insertIntoProfile = function(db,profil,callBack){
    try {
      
      var query = 'INSERT INTO profile (id, first_name, last_name, birthdate, company , '+
      'position , network , email , mobile_1 ,mobile_2 , '+
      'landline_1 , landline_2 , fax , address_line_1 , address_line_2 , '+
      'address_line_3 , postal_code , facebook , twitter , flickr , '+
      'linkedin , viadeo , website , skype , xing , myspace , '+
      'delicious , rss , link_1 , link_title_1 , link_2 ,' +
      'link_title_2 , link_3 , link_title_3 , link_4 , link_title_4 , '+
      'news_1 , news_2 , news_3 , city , country , foursquare , '+
      'googleplus , pinterest,photolocation ) VALUES'+
      '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
      var params = [profil.id, profil.first_name, profil.last_name,
                    profil.birthdate , profil.company , profil.position , profil.network ,
                    profil.email , profil.mobile_1 ,profil.mobile_2 ,
                    profil.landline_1 , profil.landline_2 , profil.fax ,
                    profil.address_line_1 , profil.address_line_2 ,
                    profil.address_line_3 , profil.postal_code , profil.facebook ,
                    profil.twitter , profil.flickr ,
                    profil.linkedin , profil.viadeo , profil.website , profil.skype ,
                    profil.xing , profil.myspace ,
                    profil.delicious , profil.rss ,addhttp( profil.link_1) , profil.link_title_1 ,
                    addhttp( profil.link_2) ,
                    profil.link_title_2 , addhttp( profil.link_3) , profil.link_title_3 ,
                    addhttp( profil.link_4) , profil.link_title_4 ,
                    profil.news_1 , profil.news_2 , profil.news_3 , profil.city ,
                    profil.country , profil.foursquare ,
                    profil.googleplus , profil.pinterest, profil.photofilelocation];
      
      $cordovaSQLite.execute(db, query, params).then(function(value) {
        return callBack();
      }, function(reason) {
        console.log(reason);
      }, function(value) {
        
      });
      return 0;
    } catch (e) {
      console.log(e);
      return 1;
    }
  };
  /**
   * SELECT profile from Db local
   */
  var selectProfile = function(db, callBack){
    try {
      
      var query = 'SELECT * FROM profile';
      $cordovaSQLite.execute(db, query).then(function(results) {
          return callBack(results);
        }, function(reason) {
          //TODO FIXME 
          console.log("error " + reason);
          return 1;
        });
     
    } catch (e) {
      console.log(e);
      return 1;
    }
   
  };
  /**
   * SELECT user from Db local
   */
  var selectUser = function(db, callBack){
	  try {
		  
		  var query = 'SELECT * FROM identifiant ';
		  $cordovaSQLite.execute(db, query).then(function(results) {
			  
			  return callBack(results);
			  
		  }, function(reason) {
			  //TODO FIXME 
			  console.log("error " + reason);
			  return 1;
		  });
		  
	  } catch (e) {
		  console.log(e);
		  return 1;
	  }
	  
  };
  
  /**
   * update profil Db local
   */
  var updateProfil = function(db, profil, callBack){
    
    try {
        
        var query = 'UPDATE  profile SET '+
        'first_name ="'+profil.first_name+'" ,'+
        'last_name="'+profil.last_name+'" ,'+
        'birthdate ="'+profil.birthdate+'" ,'+
        'company  ="'+profil.company+'" ,'+
        'position ="'+profil.position+'" ,'+
        'network ="'+profil.network+'" ,'+
        'email ="'+profil.email+'" ,'+
        'mobile_1 ="'+profil.mobile_1+'" ,'+
        'mobile_2 ="'+profil.mobile_2+'" ,'+
        'landline_1 ="'+profil.landline_1+'" ,'+
        'landline_2 ="'+profil.landline_2+'" ,'+
        'fax  ="'+profil.fax+'" ,'+
        'address_line_1  ="'+profil.address_line_1+'" ,'+
        'address_line_2  ="'+profil.address_line_2+'" ,'+
        'address_line_3  ="'+profil.address_line_3+'" ,'+
        'postal_code  ="'+profil.postal_code+'" ,'+
        'facebook  ="'+profil.facebook+'" ,'+
        'twitter ="'+profil.twitter+'" ,'+
        'flickr ="'+profil.flickr+'" ,'+
        'linkedin ="'+profil.linkedin+'" ,'+
        'viadeo ="'+profil.viadeo+'" ,'+
        'website ="'+profil.website+'" ,'+
        'skype ="'+profil.skype+'" ,'+
        'xing ="'+profil.xing+'" ,'+
        'myspace ="'+profil.myspace+'" ,'+
        'delicious ="'+profil.delicious+'" ,'+
        'rss ="'+profil.rss+'" ,'+
        'link_1 ="'+addhttp( profil.link_1)+'" ,'+
        'link_title_1  ="'+profil.link_title_1+'" ,'+
        'link_2  ="'+addhttp( profil.link_2)+'" ,'+
        'link_title_2 ="'+profil.link_title_2+'" ,'+
        'link_3 ="'+addhttp( profil.link_3)+'" ,'+
        'link_title_3  ="'+profil.link_title_3+'" ,'+
        'link_4 ="'+addhttp( profil.link_4)+'" ,'+
        'link_title_4  ="'+profil.link_title_4+'" ,'+
        'news_1 ="'+profil.news_1+'" ,'+
        'news_2 ="'+profil.news_2+'" ,'+
        'news_3 ="'+profil.news_3+'" ,'+
        'city ="'+profil.city+'" ,'+
        'country ="'+profil.country+'" ,'+
        'foursquare ="'+profil.foursquare+'" ,'+
        'googleplus ="'+profil.googleplus+'" ,'+
        'pinterest ="'+profil.pinterest+'" '+
        'where id ='+profil.id;
       
        $cordovaSQLite.execute(db, query).then(function(results){
         
          callBack(profil); //TODO FIXME cette variable contient <img id="profil"> !! normale
        }, function(reason) {
            console.log(reason);
            return 1;
        }, function(value) {
        
         console.log(value);
         return 1;
        });
        
        return 0;
      } catch (e) {
        console.log(e);
        return 1;
      }
  };
  /**
   * download photo profil 
   */
  var downloadPhotoProfil = function(photolocation, id,callBack) {
      var isWindowsPhone = ionic.Platform.isWindowsPhone();
     
    	  if(window.cordova){
    		   if (/Android|BlackBerry Mini/i.test(navigator.userAgent)) {
                   path = cordova.file.applicationStorageDirectory;
               }else if (isWindowsPhone) {
  	             path = "/";
	              } else {
                   path = cordova.file.documentsDirectory;
               }
         // cameraService.createPath('dir'+id, function (path) {
        	  if(photolocation !=""){
	 var url = "http://buzcard.fr/" + photolocation.substr(2);
     cameraService.downloadFile(path, 'imgThumbnail.jpg', url, function (urlImage) {
   	  console.warn("-------------------"+urlImage);
   	  callBack(urlImage);
         //TODO FIXME callback if need
     	});
        	  }else{
        		  callBack("img/photo_top_title.jpg");  
        	  }
             
         // });
    	  }else{
    		  callBack("img/photo_top_title.jpg");  
    	  }
     
    };

    /**
     * send buzcard to server 
     */
    var sendBuzcardToServer = function( email, selectLang, checkFollower,dateRDV, callBack,errorCallBack) {
      

      var data = "";
//      console.log(checkFollower);
//      if (checkFollower =="on") {
      data = "TextBox_Mail="+email+"&EmailLanguageDropDownList="+selectLang+"&CheckBox1="+checkFollower+"&DateRDV="+dateRDV;
//      } else {
//        data = "TextBox_Mail="+email+"&EmailLanguageDropDownList="+selectLang+"&DateRDV="+dateRDV;
//      }
      console.log(data);
     
      $.ajax({
        type : "GET",
        url : "http://buzcard.fr/send.aspx",
        success : function(a, status, xhr) {
          var action = $($.parseHTML(a)).filter("#form1").attr("action");
          var arg = action.split('?');
          $.ajax({
            type : "GET",
            url : "http://buzcard.fr/Vcard_Send.aspx?" + decodeURIComponent(arg[1]) + "&Click=OK",
            data : data,
            success : function(out, status, xhr) {
              callBack();
            },
            error : function(xhr, ajaxOptions, thrownError) {
              errorCallBack(xhr);
            }
          });
        },
        error : function(xhr, ajaxOptions, thrownError) {
          errorCallBack(xhr);
        }
      });
    };
    /**
     *   update profil server
     */
    var updateProfilServer = function(i, profil,callBack,errorCallBack){
      // TODO FIXME envoyer seullement les champs modifiée !! 
       var length =0;
       for(j in profil){
         if(length == i)   key = j;
         length++;
       }
     // the send request parameters
      var request = {
        method: 'POST',
        url: 'http://buzcard.fr/virtual_card.aspx?request=update',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for ( var p in obj)
            str.push(encodeURIComponent(p) + "="
                    + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        transformResponse: function(data) {
          var x2js = new X2JS();
          var json = x2js.xml_str2json(data);
          return json;
        },
        data: {
          update:makeXml(key,profil[key]),
        
        },
//        timeout : 4000,
      };
      $http(request).success(function(data, status, headers, config) {
        if(i<length){
          
          i++;
          updateProfilServer(i, profil,callBack,errorCallBack);
        }else{
          callBack(data);
        } 
      }).error(function(data, status, headers, config) {
        errorCallBack(status);
      });
    };
    
    /**
     * upload photo de profil buzcard
     */
    var uploadPhotoProfil = function (path, callBack, errorCallBack) {

        var isWindowsPhone = ionic.Platform.isWindowsPhone();
       

            var fileName = path.substr(path.lastIndexOf('/') + 1);
            var pathFile = path.substr(0, path.lastIndexOf('/') + 1);

            // the send request parameters
            var request = {
                method: 'POST',
                url: 'http://buzcard.fr/virtual_card.aspx?request=update',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                transformResponse: function (data) {
                    var x2js = new X2JS();
                    var json = x2js.xml_str2json(data);
                    return json;
                },
                data: {
                    update: "<update><photofilelocation>" + fileName + "</photofilelocation></update>",

                },
//                timeout: 10000,
            };
            $http(request).success(function (data, status, headers, config) {

                console.warn(' fileName ' + fileName + '  pathFile' + pathFile);
                $cordovaFile.readAsArrayBuffer(pathFile, fileName).then(function (success) {
                    // success
                    console.warn("success");

                    var fd = new FormData();
                    var image = new Uint8Array(success);
                    fd.append('photo', new Blob([image], {
                        type: 'image/jpeg'
                    }), fileName);

                    $http.post("http://buzcard.fr/virtual_card.aspx?request=update_portrait", fd, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    }).success(function (data, status, headers, config) {
                            console.log('success upload ...');
                            console.warn(data);
                            callBack();

                        })
                        .error(function () {
                            console.log('erreur');
                            errorCallBack();
                        });
                }, function (error) {
                    // error
                    errorCallBack();
                });
            });
       
  };
  
  /**
   * get custo file
   */
  var getCustoFile = function(db,callBack) {
	  //result.rows.item(0).id
	  var  d = new Date(); 
	  selectUser(db,function(result){
		    // the request parameters
	      var request = {
	      method: 'GET',
	      url: "http://buzcard.fr/upload/"+result.rows.item(0).userId+"/"+result.rows.item(0).userId+".txt?"+d.getTime(),
	      transformResponse: function(data) {
	        var array = data.split("|");
	        return array;
	      },
	    };
	   // the HTTP request
		 $http(request).success(function(data, status, headers, config) {
			 console.log('getCustoFilegetCustoFilegetCustoFilegetCustoFilegetCustoFilegetCustoFile');
				return callBack(data);
				
			}).error(function(data, status, headers, config) {
             return callBack(status);
			});
	  });
	  
	  	
  };
  
  /**
   * download photo custo 
   */
  var downloadPhotoCusto= function(photolocation, id, callBack) {
      var isWindowsPhone = ionic.Platform.isWindowsPhone();
    
          if (window.cordova) {
              cameraService.createPath(id, function(path) {
                  if (photolocation != "") {
                      var url = photolocation;
                      cameraService.downloadFile(path, 'newHeader.png', url, function(urlImage) {
                          console.warn("new header img :" + urlImage);
                          MenuService.setLocalStorage("imgCusto", urlImage);
                          return callBack(urlImage);
                      });
                  } else {
                      callBack("img/buzcard-online.png");
                  }

              });
          } else {
//        	  MenuService.setLocalStorage("imgCusto", "img/orange-logo-buz.png");
            callBack("img/buzcard-online.png");
//            return callBack("img/orange-logo-buz.png");
          }
     
  };
    /**
     * the factory returns
     */
  return {
    getProfil : getProfil,
    createProfileTable : createProfileTable,
    insertIntoProfile :insertIntoProfile,
    emptyProfileTable: emptyProfileTable,
    selectProfile: selectProfile,
    updateProfil: updateProfil,
    downloadPhotoProfil:downloadPhotoProfil,
    sendBuzcardToServer : sendBuzcardToServer,
    updateProfilServer : updateProfilServer,
    uploadPhotoProfil : uploadPhotoProfil,
    getCustoFile : getCustoFile,
    downloadPhotoCusto :downloadPhotoCusto,
  };
}]);
//make an xml  of the given parameter
function makeXml(key,value){
 return "<update><"+key+">"+value+"</"+key+"></update>";
};
//Check if a string starts with http using
function addhttp(url) {
   if (!/^(f|ht)tps?:\/\//i.test(url) && ""!= url) {
      url = "http://" + url;
   }
   return url;
};appContext.controller('BuzcardEditController', [
    'BuzcardService',
    'cameraService',
    '$scope',
    '$state',
    '$ionicPlatform',
    '$cordovaSQLite',
    '$cordovaFile',
    'LoadingService',
    '$ionicHistory',
    'ConnectionService',
    'SynchroServices',
    '$ionicScrollDelegate',
    'MenuService',
    function(BuzcardService, cameraService, $scope, $state, $ionicPlatform,
        $cordovaSQLite, $cordovaFile, LoadingService,$ionicHistory,ConnectionService,SynchroServices,$ionicScrollDelegate,MenuService) {
    	
    	if(MenuService.getLocalStorage("customisation")){
    		var custoArray = MenuService.getLocalStorage("customisation");
    		$scope.firstColor = custoArray[3];
    	}
    	
        var db = null;
        var tmpProfil ={};
        $ionicPlatform.ready(function() {
            /**
             * create/open DB
             */
            if (window.cordova) {
                db = $cordovaSQLite.openDB("buzcard.db"); // device
            } else {
                db = window.openDatabase("buzcard.db", '1', 'my', 1024 * 1024 * 10); // browser
            }
            showInfos();
        });

        /**
         * get infos profil
         */
        function showInfos() {
            BuzcardService.selectProfile(db, function(result) {
            	var isWindowsPhone = ionic.Platform.isWindowsPhone();
                var profil = result.rows.item(0);
                $scope.infos = profil;
                tmpProfil =angular.copy(result.rows.item(0));
                
                cameraService.checkExistFile('imgThumbnail.jpg',
                    function(url) {
                	if (isWindowsPhone) {
                    	$scope.photoProfil = url; // "img/photo_top_title.jpg";
                    }else{
                    	$scope.photoProfil = url+ '?' + new Date().getTime(); // "img/photo_top_title.jpg";	
                    }
                	
                        
                    });
                // activer l'onglet coordonnées par defaut
                $scope.isSelectedCordonnees = true;
            });
            LoadingService.dismiss();
        };

        /**
         * capture photo
         */
        $scope.getPhoto = function() {
        	
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 500,
                targetHeight: 500,
                correctOrientation: true,
                popoverOptions: CameraPopoverOptions
               
            };
            cameraService.getPicture(options).then(function(imageURI) {
            	LoadingService.loading("Envoi de la photo en cours...");
                var fileName = 'imgThumbnail.jpg';
                $scope.photoProfil = imageURI;
                var isWindowsPhone = ionic.Platform.isWindowsPhone();
                cameraService.RenamePicture(fileName, imageURI, function(url) {
                	
                	var imageURL =imageURI.substr(0, imageURI.lastIndexOf('?'));
                    if (imageURL =='') {
                     imageURL = imageURI;
                    }else{
                     imageURL = imageURI.substr(0, imageURI.lastIndexOf('?'));
                    }
                    
                	if (isWindowsPhone) {
                    	$scope.photoProfil = url; // "img/photo_top_title.jpg";
                    }else{
                    	$scope.photoProfil = url+ '?' + new Date().getTime(); // "img/photo_top_title.jpg";	
                    }
                    ConnectionService.isConnected(db,function() {
                    //cas il ya connection 
                    BuzcardService.uploadPhotoProfil(url, function() {
                    	LoadingService.dismiss();
                        console.log('success upload PHOTO');
                    }, function(){
                    	LoadingService.dismiss();
                  	  console.log('erreur upload photo buzcard');
                    });
                    },function(){
                    	// cas pas de connection
                    	 SynchroServices.insertRequest(db, "BUZCARDPHOTO", {path:url}, function() {
                    		 console.log('Request inserted BUZCARDPHOTO');
                         });
                    });
                });
            }, function(err) {
                console.error(err);
            });
        };
        /**
         * choose file from library
         */
        $scope.choseFile = function() {
        	
        	  var options = {
                      quality: 100,
                      destinationType: Camera.DestinationType.FILE_URI,
                      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                      encodingType: Camera.EncodingType.JPEG,
                      targetWidth: 500,
                      targetHeight: 500,
                      correctOrientation: true,
                      popoverOptions: CameraPopoverOptions
                  };

            cameraService.getPicture(options).then(function(imageURI) {
            	LoadingService.loading("Envoi de la photo en cours...");
                var fileName = 'imgThumbnail.jpg';
                $scope.photoProfil = imageURI;
                var isWindowsPhone = ionic.Platform.isWindowsPhone();
                var imageURL =imageURI.substr(0, imageURI.lastIndexOf('?'));
                if (imageURL =='') {
                 imageURL = imageURI;
                }else{
                 imageURL = imageURI.substr(0, imageURI.lastIndexOf('?'));
                }
               
                cameraService.RenamePicture(fileName, imageURL, function(url) {
                	if (isWindowsPhone) {
                    	$scope.photoProfil = url; // "img/photo_top_title.jpg";
                    }else{
                    	$scope.photoProfil = url+ '?' + new Date().getTime(); // "img/photo_top_title.jpg";	
                    }
                    ConnectionService.isConnected(db,function() {
                    	//cas ou il ya connexion 
                    	  BuzcardService.uploadPhotoProfil(url, function() {
                    		  LoadingService.dismiss();
                              console.log('success upload PHOTO');
                          }, function(){
                        	  LoadingService.dismiss();
                          	  console.log('erreur upload photo buzcard');
                          });
                    },function(){
                    	// cas pas de connexion 
                    	 SynchroServices.insertRequest(db, "BUZCARDPHOTO", {path:url}, function() {
                    		 console.log('Request inserted BUZCARDPHOTO');
                    });
                  
                 });
                });
            }, function(err) {
                console.error(err);
            });

        };

        /**
         * update infos profil
         */
        $scope.updateProfile = function() {
         
            LoadingService.loading("Mise à jour du profil en cours...");
            BuzcardService.updateProfil(db, $scope.infos, function(profil) {
           
            });

            ConnectionService.isConnected(db,function() {
                //cas ou il y a de connection
              
                /***********************\
                 préparation de l'objet 
                \***********************/
                var profilObj = {};
                for (var key in tmpProfil)
                   if($scope.infos[key] != tmpProfil[key])
                     profilObj[key] =$scope.infos[key];
                //if there is no difference (no modification)
                if (isEmpty(profilObj)) {
                  LoadingService.dismiss();
                  $state.go("app.buzcard", {}, {reload: true});
                } else {
                  BuzcardService.updateProfilServer(0, profilObj, function(data) {
                    if (data.response.status == 0) {
                      LoadingService.dismiss();
                      $state.go("app.buzcard", {}, {reload: true});

                    } else {
                        LoadingService.error("Une erreur est survenue lors synchronisation", "BuzcardEditController");
                    }

                }, function(status) {
                    LoadingService.error("Une erreur réseau est survenue ", "BuzcardEditController");
                });
                }

                
            }, function() {
              
           // cas s'il pas de connection
              /***********************\
               préparation de l'objet 
              \***********************/
              var profilObj = {};
              for (var key in tmpProfil)
                  if ($scope.infos[key] != tmpProfil[key])
                      profilObj[key] = $scope.infos[key];
                  //if there is no modification 
              if (!isEmpty(profilObj)) {
                  SynchroServices.insertRequest(db, "BUZCARDEDIT", {profile:profilObj} , function() {
                      LoadingService.dismiss();
                      $state.go("app.buzcard", {}, {reload: true});
                  });
              }
              //buzcard modified
              else {
                  LoadingService.dismiss();
                  $state.go("app.buzcard", {}, {reload: true});
              }
              });

        };

        /**
         * select l'onglet actif
         */
        $scope.selectElement = function(element,event) {

            if (element == 'Coordonnes') {
                if ($scope.isSelectedCordonnees) {
                    $scope.isSelectedCordonnees = false;
                } else {
                    $scope.isSelectedCordonnees = true;
                    $scope.isSelectedAdresse = false;
                    $scope.isSelectedrxSociaux = false;
                    $scope.isSelectedLink = false;
                    $scope.isSelectedNews = false;
                }

            } else if (element == 'Adresse') {
                if ($scope.isSelectedAdresse) {
                    $scope.isSelectedAdresse = false;
                } else {
                    $scope.isSelectedAdresse = true;
                    $scope.isSelectedCordonnees = false;
                    $scope.isSelectedrxSociaux = false;
                    $scope.isSelectedLink = false;
                    $scope.isSelectedNews = false;
                }

            } else if (element == 'rxSociaux') {
                if ($scope.isSelectedrxSociaux) {
                    $scope.isSelectedrxSociaux = false;
                } else {
                    $scope.isSelectedAdresse = false;
                    $scope.isSelectedCordonnees = false;
                    $scope.isSelectedrxSociaux = true;
                    $scope.isSelectedLink = false;
                    $scope.isSelectedNews = false;
                }

            } else if (element == 'link') {
                if ($scope.isSelectedLink) {
                    $scope.isSelectedLink = false;
                } else {
                    $scope.isSelectedAdresse = false;
                    $scope.isSelectedCordonnees = false;
                    $scope.isSelectedrxSociaux = false;
                    $scope.isSelectedLink = true;
                    $scope.isSelectedNews = false;
                }

            } else if (element == 'news') {
                if ($scope.isSelectedNews) {
                    $scope.isSelectedNews = false;
                } else {
                    $scope.isSelectedAdresse = false;
                    $scope.isSelectedCordonnees = false;
                    $scope.isSelectedrxSociaux = false;
                    $scope.isSelectedLink = false;
                    $scope.isSelectedNews = true;
                }
                
            }
            $ionicScrollDelegate.scrollTo(0, event.layerY,false);
        };

        $scope.dismiss = function() {
            LoadingService.dismiss();
        };
        
        function isEmpty(value){
          return Boolean(value && typeof value == 'object') && !Object.keys(value).length;
        };
        $scope.keyPressed = function(keyEvent) {
            if (keyEvent.keyCode == 13) {
              
               cordova.plugins.Keyboard.close();
            }
        };

    }
]);appContext.controller('BuzcardSendController', ['$cordovaDatePicker','$scope', 'MenuService', 'BuzcardService', 'LoadingService', '$filter', 'ContactsService', '$state', '$ionicPlatform', '$cordovaSQLite', '$ionicHistory', '$rootScope', 'cameraService', 'ConnectionService', 'SynchroServices', function($cordovaDatePicker, $scope, MenuService, BuzcardService, LoadingService, $filter, ContactsService, $state, $ionicPlatform, $cordovaSQLite, $ionicHistory, $rootScope, cameraService, ConnectionService, SynchroServices) {


    if (MenuService.getLocalStorage("customisation")) {
        var custoArray = MenuService.getLocalStorage("customisation");
        $scope.secondColor = "1px solid " + custoArray[4];
        $scope.firstColor = custoArray[3];
    }
    var db = null;

    $scope.photoContact = null;
    $ionicPlatform.ready(function() {
        /**
         * create/open DB
         */
        if (window.cordova) {
            db = $cordovaSQLite.openDB("buzcard.db"); // device
        } else {
            db = window.openDatabase("buzcard.db", '1', 'my', 1024 * 1024 * 10); // browser
        }

        $scope.email = "";
        
        $scope.dateRDV= $filter('date')(new Date(), 'dd/MM/yyyy');
        $scope.selectLang = 'fr';
        

        $scope.checkFollower = true;
    });
    
//    $scope.dateChange = function(dateRDV){
//    	alert(dateRDV);
//    	if (dateRDV == null) {
//    		$scope.dateRDV=  new Date();
//		} else {
//			$scope.dateRDV =  new Date(dateRDV);
//		}
//    	
//    };
    $scope.sendBuzcard = function(email, selectLang, checkFollower, dateRDV) {
    	
    	 dateRDV = $('#datepickerDirective').val();
    	 var dateRDVT = new Date(dateRDV.substr(6,4),dateRDV.substr(3,2),dateRDV.substr(0,2));
    	
    	 MenuService.setLocalStorage('ReloadContactList', 1);
        var checkFollowerValue = '';
        if (checkFollower) {
            checkFollowerValue = 'on';
        } else {
            checkFollowerValue = 'off';
        }
//       alert(dateRDV);
        var dateRDVValue = "";
        if (dateRDV == '' || dateRDV == null) {
            dateRDVValue = $filter('date')(new Date(), 'dd/MM/yyyy');
        } else {
            dateRDVValue = $filter('date')(dateRDV, 'dd/MM/yyyy');
        }
//        alert(dateRDVValue);
        if (typeof email === 'undefined' || typeof email === null) {
            LoadingService.error("Entrez l'adresse email de votre interlocuteur.", "BuzcardSendController");

        } else if (!validateEmail(email)) {

            LoadingService.error("L\'adresse email renseignée est invalide", "BuzcardSendController");
        } else {
            ConnectionService.isConnected(db, function() {
            	//************* cas connecté ********************** 
                LoadingService.loading("Envoi de buzcard ");

                if (typeof selectLang === 'undefined' || typeof selectLang === null)
                    selectLang = "fr";
                BuzcardService.sendBuzcardToServer(email, selectLang, checkFollowerValue, dateRDVValue, function() {
                    console.warn("send ok--+++-");
                    //check if email exist in data base
                    ContactsService.selectContactbyEmail(db, email, function(result) {
                        LoadingService.loading('Chargement de la fiche en cours...');
                        console.warn("select contact from db ok---");
                        if (result.rows.length == 0) {
                            //get contact from server
                            ContactsService.getContactFromServerByEmail(email, function(contact) {
                                //insert contact into db
                                ContactsService.insertIntoContactsTable(db, contact, function() {
                                    //save photo when get photo from camera buzcard send dans le cas d'un nouveau email
                                    if ($scope.photoContact != null) {

                                        var idProfil = $rootScope.idProfil;
                                        var fileName =  contact.id + '.jpg';

                                        cameraService.RenamePicture(fileName, $scope.photoContact, function(url) {
                                            ContactsService.updateContactPhoto(db, contact.id, url, function() {
                                                ContactsService.uploadPhotoContact(url, contact.id, function() {
                                                    LoadingService.confirm("Votre buzcard a bien été envoyée à <br><font style='font-style: normal;color:#79A436'>" + email + "<br></font>Vous pouvez compléter sa fiche et l\'affecter à un groupe", contact.id, "BuzcardSendController");
                                                   
                                                }, function() {
                                                    console.log('erreur upload photo contact');
                                                });
                                            });
                                        });
                                    } else {
                                        LoadingService.confirm("Votre buzcard a bien été envoyée à <br><font style='font-style: normal;color:#79A436'>" + email + "</font><br>Vous pouvez compléter sa fiche et l\'affecter à un groupe", contact.id, "BuzcardSendController");
                                    }


                                });

                            }, function() {
                                //get contact from server error
                            });
                        } else {
                            console.warn("contact already exist");                          
                            var dateRdvTimeStamp = parseInt(dateRDVT.getTime() / 1000);
                            ContactsService.updateContactLastSendAndLanguageRdv(db, result.rows.item(0).id, extractLang(selectLang), dateRdvTimeStamp, function(resX) {
                                console.log("#### resx ##### " + JSON.stringify(resX.rows.item(0)) + " ######");
                                ContactsService.updateContactStatus(db, result.rows.item(0).id, checkFollowerValue, function() {
                                    //save photo camera dans le cas d'un email existant 
                                    if ($scope.photoContact != null) {

                                        var idProfil = $rootScope.idProfil;
                                        var fileName =  result.rows.item(0).id + '.jpg';

                                        cameraService.RenamePicture(fileName, $scope.photoContact, function(url) {
                                            ContactsService.updateContactPhoto(db, result.rows.item(0).id, url, function() {
                                                ContactsService.uploadPhotoContact(url, result.rows.item(0).id, function() {
                                                    console.log('uploaded CONTACTPHOTO');
                                                    LoadingService.confirm("Votre buzcard a bien été envoyée à <br><font style='font-style: normal;color:#79A436'>" + email + "<br></font>Vous pouvez compléter sa fiche et l\'affecter à un groupe", result.rows.item(0).id, "BuzcardSendController");

                                                }, function() {
                                                    console.log('erreur upload photo contact');
                                                });

                                            });
                                        });
                                    } else {
                                        LoadingService.confirm("Votre buzcard a bien été envoyée à <br><font style='font-style: normal;color:#79A436'>" + email + "<br></font>Vous pouvez compléter sa fiche et l\'affecter à un groupe", result.rows.item(0).id, "BuzcardSendController");

                                    }
                                });
                            });
                        }

                    });

                }, function(thrownError) {
                	console.log('erreur send buzcard'+JSON.stringify(thrownError));
                    LoadingService.error("Une erreur réseau est survenue", "BuzcardSendController");
                });



            }, function() {
                LoadingService.loading("Votre buzcard sera envoyée à<br><font style='font-style: normal;color:#79A436'>" + email + "<br></font>dès que vous aurez à nouveau du réseau");
              //************* cas non connecté ********************** 
                var object = {
                    email: email,
                    selectLang: selectLang,
                    checkFollower: checkFollowerValue,
                    dateRDV: dateRDVValue
                };
                SynchroServices.insertRequest(db, "BUZCARDSEND", object, function() {
                    ContactsService.selectContactbyEmail(db, email, function(result) {
                    	//************* mode offline & nouveau contact  ********************** 
                        if (result.rows.length == 0) {
                            //insert contact into db
                            var idTmp = parseInt(new Date().getTime() / 1000);

                            var status = "";
                            if (checkFollowerValue == "on") {
                                status = "selected";
                            } else {
                                status = "cant_be_selected";
                            }
                            var contactObj = {
                                id: idTmp,
                                email: email,
                                date: idTmp,
                                rendez_vous: toUsFormat(dateRDVValue),
                                comment: "",
                                last_name: "",
                                first_name: "",
                                phone_1: "",
                                phone_2: "",
                                company: "",
                                list: "",
                                status: status,
                                firstsendemail: $filter('date')(new Date(), 'MM/dd/yyyy hh:mm'),
                                lastsendemail: "",
                                LanguageText: extractLang(selectLang)
                            };
                            console.log("#### do not exist ##### " + JSON.stringify(contactObj) + " ######");
                            ContactsService.insertIntoContactsTable(db, contactObj, function() {
                                if ($scope.photoContact != null) {

                                    var idProfil = $rootScope.idProfil;
                                    var fileName = idTmp + '.jpg';

                                    cameraService.RenamePicture(fileName, $scope.photoContact, function(url) {
                                        ContactsService.updateContactPhoto(db, contactObj.id, url, function() {
                                            LoadingService.confirm("Votre buzcard sera envoyée à<br><font style='font-style: normal;color:#79A436'>" + email + "<br></font>dès que vous aurez à nouveau du réseau", idTmp, "BuzcardSendController");

                                        });
                                    });
                                } else {
                                    LoadingService.confirm("Votre buzcard sera envoyée à<br><font style='font-style: normal;color:#79A436'>" + email + "<br></font>dès que vous aurez à nouveau du réseau", idTmp, "BuzcardSendController");

                                }
                            });
                        } else {
                            //************* mode offline & contact exist deja ********************** 
                            contactX = {
                                id: result.rows.item(0).id,
                                rendez_vous: $filter('date')(new Date(dateRDV), 'MM/dd/yyyy'),
                                lastsendemail: $filter('date')(new Date(), 'MM/dd/yyyy hh:mm'),
                                LanguageText: extractLang(selectLang)
                            };
                            console.log("#### exist ##### " + JSON.stringify(contactX) + " ######");
                            console.log($scope.photoContact);
                            if ($scope.photoContact != null) {
                            	console.log("eeeeeeeee if");
                                var idProfil = $rootScope.idProfil;
                                var fileName = 'dir'+idProfil + '/' + contactX.id + '.jpg';
                                console.log("aaaaaaa "+fileName+ " aaaaaaaaa");
                                cameraService.RenamePicture(fileName, $scope.photoContact, function(url) {
                                    ContactsService.updateContactPhoto(db, contactX.id, url, function() {
                                        ContactsService.updateContactInfoNew(db, contactX, function() {
                                            delete contactX.id;
                                            delete contactX.rendez_vous;
                                            delete contactX.lastsendemail;
                                            SynchroServices.insertRequest(db, "CONTACTEDIT", {
                                                id: result.rows.item(0).id,
                                                contact: contactX
                                            }, function() {
                                                LoadingService.confirm("Votre buzcard sera envoyée à<br><font style='font-style: normal;color:#79A436'>" + email + "<br></font>dès que vous aurez à nouveau du réseau", result.rows.item(0).id, "BuzcardSendController");
                                            });

                                        });

                                    });
                                });
                            } else {
                            	console.log("eeeeeeeee else");
                                ContactsService.updateContactInfoNew(db, contactX, function() {
                                    delete contactX.id;
                                    delete contactX.rendez_vous;
                                    delete contactX.lastsendemail;
                                    SynchroServices.insertRequest(db, "CONTACTEDIT", {
                                        id: result.rows.item(0).id,
                                        contact: contactX
                                    }, function() {
                                        LoadingService.confirm("Votre buzcard sera envoyée à<br><font style='font-style: normal;color:#79A436'>" + email + "<br></font>dès que vous aurez à nouveau du réseau", result.rows.item(0).id, "BuzcardSendController");
                                    });

                                });
                            }



                        }
                    });
                });
            });
        }

    };

    // to dismiss the PopUp
    $scope.ok = function(id) {
        LoadingService.dismiss();

        $state.go("app.contactEdit", {
            'id': id
        });
    };
    // to dismiss the PopUp
    $scope.dismiss = function() {
        LoadingService.dismiss();
    };
    //capture photo buzcard send 

    $scope.getPhoto = function() {
        LoadingService.loading("");
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 500,
            targetHeight: 500,
            correctOrientation: true,
            popoverOptions: CameraPopoverOptions
        };
        cameraService.getPicture(options).then(function(imageURI) {
            // var fileName = $scope.infos.id + '/portrait.jpg';
            $scope.photoContact = imageURI;
            LoadingService.dismiss();
        }, function(err) {
            console.error(err);
            LoadingService.dismiss();
        });
    };

    function toUsFormat(date) {
        console.warn("initial date : " + date)
        var array = date.split("/");
        var dateTmp = array[1] + "/" + array[0] + "/" + array[2];
        console.log("new format : " + dateTmp);
        return dateTmp;
    }

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    function extractLang(lang) {	
        try {
    	    var elt = document.getElementById("selectLangId");

    	    if (elt.selectedIndex == -1)
    	        return null;

    	    return elt.options[elt.selectedIndex].text.split("/")[0];
        } catch (e) {
        	var elt = document.getElementById("selectLangId");
            return elt.options[elt.selectedIndex].text;
        }

    }

}]);// 1
$scope.images = [];

$scope.addImage = function() {
	// 2
	var options = {
		destinationType : Camera.DestinationType.FILE_URI,
		sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
		allowEdit : false,
		encodingType : Camera.EncodingType.JPEG,
		popoverOptions : CameraPopoverOptions,
	};

	// 3
	$cordovaCamera
			.getPicture(options)
			.then(
					function(imageData) {

						// 4
						onImageSuccess(imageData);

						function onImageSuccess(fileURI) {
							createFileEntry(fileURI);
						}

						function createFileEntry(fileURI) {
							window.resolveLocalFileSystemURL(fileURI, copyFile,
									fail);
						}

						// 5
						function copyFile(fileEntry) {
							var name = fileEntry.fullPath
									.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
							var newName = makeid() + name;

							window.resolveLocalFileSystemURL(
									cordova.file.dataDirectory, function(
											fileSystem2) {
										fileEntry.copyTo(fileSystem2, newName,
												onCopySuccess, fail);
									}, fail);
						}

						// 6
						function onCopySuccess(entry) {
							$scope.$apply(function() {
								$scope.images.push(entry.nativeURL);
							});
						}

						function fail(error) {
							console.log("fail: " + error.code);
						}

						function makeid() {
							var text = "";
							var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

							for (var i = 0; i < 5; i++) {
								text += possible.charAt(Math.floor(Math
										.random()
										* possible.length));
							}
							return text;
						}

					}, function(err) {
						console.log(err);
					});
}appContext.controller('CommandesController', ['$scope', '$state',   '$ionicPlatform','$cordovaSQLite', '$ionicSlideBoxDelegate',
    function($scope,$state,$ionicPlatform,$cordovaSQLite,$ionicSlideBoxDelegate) {

	var db = null;
		$ionicPlatform.ready(function() {

			/**
			 * create/open DB
			 */
			if (window.cordova) {
			  db = $cordovaSQLite.openDB("buzcard.db"); // device
			} else {
			  db = window.openDatabase("buzcard.db", '1', 'my',1024 * 1024 * 10); // browser
			}
		});

		$scope.next = function() {
		  	console.log('NEXT');
		  	$scope.$broadcast('slideBox.nextSlide');
		};
		$scope.prev = function() {
		  	console.log('PREV');
		  	$scope.$broadcast('slideBox.prevSlide');
		};
		$scope.slideChanged = function(index) {
		  	console.log('Slide changed', index);
		};
		
		$scope.store1 = function() {
				
						window.open("http://stores.buzcard.fr/contact", '_system');
				
		};
		$scope.store2 = function() {
					
						window.open("http://stores.buzcard.fr/pages/Creez-votre-buzcard-forever", '_system');
					
		};
		$scope.store3 = function() {
				
						window.open("http://stores.buzcard.fr/pages/Creez-votre-buzcard-forever", '_system');
				
		};
}]);appContext.factory("ConnectionService", ['LoginService', '$http','SynchroServices','BuzcardService','ContactsService','LoadingService','$rootScope','cameraService','MenuService','$timeout', function(LoginService, $http,SynchroServices,BuzcardService,ContactsService,LoadingService,$rootScope,cameraService,MenuService,$timeout ) {


    /**
     * test if there is connection
     */
    var isConnected = function(db, connectedCallBack, notConnectedCallBack) {

      //forcer le mode offline
//      if (MenuService.getLocalStorage("currentMode")=="ONLINE") {
    	  console.info("the mode is : ONLINE");
        // the request parameters
        var testRequest = {
            method: 'GET',
            url: 'http://buzcard.fr/nepaseffacer.txt',
            timeout: 1000,
            params: { 
                'foobar': new Date().getTime() 
            },
        };
        // server call
        $http(testRequest).success(function(data, status, headers, config) {
            if (data == "OK") {
            	console.info("remote file was readed...");
                LoginService.logout().success(
                    function(data, status, headers, config) {
                        LoginService.selectCredentials(db, function(result) {
                            LoginService.doLogin(result.rows.item(0).email,
                                result.rows.item(0).password).success(
                                function(data, status, headers, config) {
                                  execReq(db,function(){
                                    
                                    return connectedCallBack();
                                  });
                                });
                        });
                    });
            } else {
                console.warn("not connected");
                return notConnectedCallBack();
            }
        }).error(function(data, status, headers, config) {
            console.error("error & not connected");
            return notConnectedCallBack();
        });
      //forcer le mode offline  
//      } else {
//    	  console.info("the mode is : OFFLINE");
//        return notConnectedCallBack();
//      }

     
    };


    function execReq(db,callBack){
      SynchroServices.selectAllRequest(db,function(result){
        if (result.rows.length > 0) {
          LoadingService.loading("Synchronisation en cours...");
          MenuService.setLocalStorage('ReloadContactList', 1);
          switch (result.rows.item(0).name) {
          case "BUZCARDEDIT":
            BuzcardService.updateProfilServer(0, JSON.parse(result.rows.item(0).object).profile,function(){
              SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
                execReq(db,callBack);
              });
            },function(){
            	LoadingService.dismiss();
            	$timeout(function(){
                    alert("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard");
                         return callBack();
                   },200);
            });
            break;


          case "CONTACTEDIT":
            ContactsService.updateContactServer(0, JSON.parse(result.rows.item(0).object).id,JSON.parse(result.rows.item(0).object).contact,function(){
              SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
                execReq(db,callBack);
              });
            },function(){
            	LoadingService.dismiss();
            	$timeout(function(){
                    alert("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard");
                         return callBack();
                   },200); 
            });
            break;
            
          case "RENAMEGROUP":
            ContactsService.updateGroupServer(JSON.parse(result.rows.item(0).object).oldName,JSON.parse(result.rows.item(0).object).newName,function(){
              SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
                execReq(db,callBack);
              });
            },function(){
            	LoadingService.dismiss();
            	$timeout(function(){
                    alert("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard");
                         return callBack();
                   },200); 
            });
            break;
            
          case "BUZCARDSEND":
            BuzcardService.sendBuzcardToServer(JSON.parse(result.rows.item(0).object).email, JSON.parse(result.rows.item(0).object).selectLang, JSON.parse(result.rows.item(0).object).checkFollower, JSON.parse(result.rows.item(0).object).dateRDV, function(){
              console.log(" ***** send ok  ******");
              //get contact from server
              ContactsService.getContactFromServerByEmail(JSON.parse(result.rows.item(0).object).email, function(contactServer) {
                console.log("****** get email from server ok **** ");
                //select contact from local
                ContactsService.selectContactbyEmail(db, JSON.parse(result.rows.item(0).object).email, function(resultx) {
                  //it s a new contact
               if (contactServer.id != resultx.rows.item(0).id) {
                 //changement de id
                 ContactsService.updateContactIdByEmail(db,JSON.parse(result.rows.item(0).object).email,contactServer.id,function(){
                  /*******************************\
                    préparation de l'objet serveur
                  \*******************************/
                   var contactObj = {};
                   var localContact = resultx.rows.item(0);
                   var remoteContact = contactServer;
                   for (var key in localContact)
                      if(remoteContact[key] != localContact[key])
                        contactObj[key] =localContact[key];
                     
                    delete contactObj.rendez_vous;
                    delete contactObj.id;
                    delete contactObj.date;
                    /** end **/
                    if(!isEmpty(contactObj)){
                      console.log("£££££££ contactObj n est pas vide");
                      //add contact edit request
                      SynchroServices.insertRequest(db,"CONTACTEDIT",{id:remoteContact.id, contact:contactObj},function(){

                    	  //--------check if existe photo depuis buzcard send et le renomer et le synchroniser vers le serveur 
                    	  var idProfil = $rootScope.idProfil;
                    	  cameraService.checkExistFile('dir'+idProfil, localContact.id + '.jpg',function(url) {
                    		if(url != "img/photo_top_title.jpg"){
                    			console.log("$$$$$$ img exist");
                    			var fileName = 'dir'+idProfil + '/' + remoteContact.id+ '.jpg';

                                cameraService.RenamePicture(fileName, url, function(url) {
                               	 ContactsService.uploadPhotoContact(url, remoteContact.id, function(){
                                      // remove request
                                      console.log("request inserted");
                                      SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
                                        execReq(db,callBack);
                                      });
                                    	
                                    	
                                    }, function(){
                                    	LoadingService.dismiss();
                                    	$timeout(function(){
                                            alert("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard");
                                                 return callBack();
                                           },200);
                                    });  
                              
                                 });
                    		}else{
                    			console.log("$$$$$$ img exist pas");
                    			  // remove request
                                console.log("request inserted");
                                SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
                                  execReq(db,callBack);
                                });
                    		}
                      });
                    	//--------------
                      });
                    }else {
                      console.log(" ££££££££ contactObj est vide");
                      //--------check if existe photo depuis buzcard send et le renomer et le synchroniser vers le serveur 
                	  var idProfil = $rootScope.idProfil;
                	  cameraService.checkExistFile('dir'+idProfil, localContact.id + '.jpg',function(url) {
                		if(url != "img/photo_top_title.jpg"){
                			 console.log("£££££££ img exist");
                			var fileName = 'dir'+idProfil + '/' + remoteContact.id+ '.jpg';

                            cameraService.RenamePicture(fileName, url, function(url) {
                           	 ContactsService.uploadPhotoContact(url, remoteContact.id, function(){
                                  // remove request
                                  console.log("request inserted");
                                  SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
                                    execReq(db,callBack);
                                  });
                                	
                                	
                                }, function(){
                                	LoadingService.dismiss();
                                	$timeout(function(){
                                        alert("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard");
                                             return callBack();
                                       },200);
                                });  
                          
                             });
                		}else{
                			  // remove request
                			console.log("£££££££ img exist pas");
                            console.log("request inserted");
                            SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
                              execReq(db,callBack);
                            });
                		}
                  });
                	//--------------
                    }


                 });
                 //contact existant
                }else {
                	console.log(".............. contact existant .......");
                	
                	/**
                	 * upload photo si il a
                	 * update contact if there modification in local
                	 */
//                  SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
//                    execReq(db,callBack);
//                  });
                	  var idProfil = $rootScope.idProfil;
                	  cameraService.checkExistFile('dir'+idProfil, contactServer.id + '.jpg',function(url) {
                		if(url != "img/photo_top_title.jpg"){
                			 console.log("£££££££ img exist");
                			var fileName = 'dir'+idProfil + '/' + contactServer.id+ '.jpg';

                            cameraService.RenamePicture(fileName, url, function(url) {
                           	 ContactsService.uploadPhotoContact(url, contactServer.id, function(){
                                  // remove request
                                  console.log("request inserted");
                                  SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
                                    execReq(db,callBack);
                                  });
                                	
                                	
                                }, function(){
                                	LoadingService.dismiss();
                                	$timeout(function(){
                                        alert("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard");
                                             return callBack();
                                       },200);
                                });  
                          
                             });
                		}else{
                			  // remove request
                			console.log("£££££££ img exist pas");
                            console.log("request inserted");
                            SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
                              execReq(db,callBack);
                            });
                		}
                  });
                }
                });    
 

              }, function() {
                  
              });
              
              
              
              
            },function(){
             LoadingService.dismiss();
             $timeout(function(){
              alert("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard");
                   return callBack();
             },200);
            });
            break;
            
          case "BUZCARDPHOTO":
            BuzcardService.uploadPhotoProfil(JSON.parse(result.rows.item(0).object).path,function(){
              SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
                execReq(db,callBack);
              });
            },function(){
            	LoadingService.dismiss();
            	$timeout(function(){
                    alert("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard");
                         return callBack();
                   },200);
            });
            break;
            
          case "CONTACTPHOTO":
            ContactsService.uploadPhotoContact(JSON.parse(result.rows.item(0).object).path,JSON.parse(result.rows.item(0).object).id,function(){
              SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
                execReq(db,callBack);
              });
            },function(){
            	LoadingService.dismiss();
            	$timeout(function(){
                    alert("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard");
                         return callBack();
                   },200);
            });
            break;
            
          case "CONTACTDELETE":
        	  ContactsService.deleteContactServer(JSON.parse(result.rows.item(0).object).id,function(data){
        		  SynchroServices.deleteRequest(db,result.rows.item(0).id,function(){
                      execReq(db,callBack);
                    });  
        	  },function(){
        		  LoadingService.dismiss();
        		  $timeout(function(){
                      alert("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard");
                           return callBack();
                     },200); 
        	  });
        	  
        	  break;
          }
        } else {
          return callBack();
        }
        
      });
    };
    
    /**
     * test if object is empty
     */
    function isEmpty(value){
      return Boolean(value && typeof value == 'object') && !Object.keys(value).length;
    };
    return {
        isConnected: isConnected,
    };
}]);appContext.factory("LoadingService", ['$ionicLoading', function($ionicLoading) {
  
  var error = function (msg,controller) {
    
    $ionicLoading.show({
      template: '<div class="window error" ng-controller="'+controller+'"><p class="incorrect_informations_text">'+msg+'.</p><button class="ok_text" ng-click="dismiss()">ok</button></div>',
      animation: 'fade-in',
      showBackdrop: true,
    });
    
  };
  
  var success = function(msg,controller) {
    
    $ionicLoading.show({
      template: '<div class="window" ng-controller="'+controller+'"><p class="activated_KDO_text">'+msg+'</p><button class="ok_text" ng-click="dismiss()">ok</button></div>',
      animation: 'fade-in',
      showBackdrop: true,
    });
    
  };
  
  var question = function(msg,params, controller) {
	    
	    $ionicLoading.show({
	      template: '<div class="window" ng-controller="'+controller+'"><p class="activated_KDO_text">'+msg+'</p><button class="no_text" ng-click="no()">Non</button><button class="yes_text" ng-click="yes('+params+')">oui</button></div>',
	      animation: 'fade-in',
	      showBackdrop: true,
	    });
	    
	  };
	  
  var loading = function(msg) {
    $ionicLoading.show({
      template: '<p class="item-icon-left" id="lodingText" style="color: #000; background-color: #FFFFFF; margin: auto; padding: 12px 10px 0px 10px; display: block; border-radius: 6px;">'+msg+'<br><img src="img/loading.gif"></p>',
      animation: 'fade-in',
      showBackdrop: true,
    });
  };
  
  var dismiss = function() {
    $ionicLoading.hide();
  };
  
  var confirm = function(msg,params, controller) {
    
    $ionicLoading.show({
      template: '<div class="window" ng-controller="'+controller+'"><p class="activated_KDO_text">'+msg+'</p><button class="yes_text" ng-click="ok('+params+')">OK</button></div>',
      animation: 'fade-in',
      showBackdrop: true,
    });
    
  };
  
  var questionSynchro = function(msg, controller) {
	    
	    $ionicLoading.show({
	      template: '<div class="window" ng-controller="'+controller+'"><p class="activated_KDO_text">'+msg+'</p><button class="no_text" ng-click="no()">Annuler</button><button class="yes_text" ng-click="yes()">Ok</button></div>',
	      animation: 'fade-in',
	      showBackdrop: true,
	    });
	    
	  };
	  
  var loadingWithPourcentage = function(msg){
	  $ionicLoading.show({
	      template: '<p class="item-icon-left" id="lodingText" style="color: #000; background-color: #FFFFFF; margin: auto; padding: 12px 10px 0px 10px; display: block; border-radius: 6px;">'+msg+'&nbsp{{pourcentage}}<br><img src="img/loading.gif"></p>',
	      animation: 'fade-in',
	      showBackdrop: true,
	    });
  } 
  
  return {
    error : error,
    success : success,
    loading : loading,
    dismiss : dismiss,
    question: question,
    confirm : confirm,
    questionSynchro:questionSynchro,
    loadingWithPourcentage :loadingWithPourcentage,
  };
}]);appContext.factory('cameraService', ['$q','$cordovaFile','$timeout','$cordovaFileTransfer', function($q, $cordovaFile,$timeout, $cordovaFileTransfer) {

 
   var  getPicture=  function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    };
   /**
    * 
    */
    var RenamePicture= function(NewPathFile, imageURL, callBack){
    
        var isWindowsPhone = ionic.Platform.isWindowsPhone();
       
    	var fileName = imageURL.substr(imageURL.lastIndexOf('/')+1);
    	var pathFile = imageURL.substr(0,imageURL.lastIndexOf('/')+1);
    	var newFileName = NewPathFile;
    	var path="";
	    	if(window.cordova){
	    	    if( /Android|BlackBerry Mini/i.test(navigator.userAgent) ) {
				 path = cordova.file.applicationStorageDirectory;
	    	    } else if (isWindowsPhone) {
	             path = "/";
	              } else {
	             path = cordova.file.documentsDirectory;
				}
	    	//TODO FIXME  a terminer 
	    	var dirFile =path;
		        $cordovaFile.moveFile(pathFile,fileName ,dirFile, newFileName)
		          .then(function (success) {
		        	  
		         callBack(success.nativeURL);
		        }, function (error) {
		         callBack(imageURL);
		        });
	    	}else{
	    		callBack("");
	    	}
     
    };
    /**
     * download photo serveur 
     */
    var downloadFile= function(path, nameFile, url, callBack){

       if(window.cordova){
    	   
	$cordovaFile.createFile(path, nameFile, true)
            .then(function (success) {
            	window.localStorage.setItem('encours'+nameFile, true);
                var targetPath = success.nativeURL;
                var trustHosts = true;
                var options = {};
                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                  .then(function (result) {
                      //successs
                	  window.localStorage.removeItem('encours'+nameFile);
                      callBack(result.nativeURL);
                  }, function (err) {
                	  console.log('erreur download'+err.message);
                	  // Error
                	   console.log('path'+path);
                	   console.log('nameFile'+nameFile);
            $cordovaFile.removeFile(path, nameFile)
                      .then(function (success) {
                    	  window.localStorage.removeItem('encours'+nameFile);
                    	  callBack("img/photo_top_title.jpg");
                      }, function (error) {
                        // error
                    	  window.localStorage.removeItem('encours'+nameFile);
                    	  console.log('erreur remove');
                    	  callBack("img/photo_top_title.jpg");
                      });
                    
                  }, function (progress) {

                  });

            }, function (error) {
                // error
            	console.error(JSON.stringify(error));
            	callBack("img/photo_top_title.jpg");
            });
    	
        }else{
        	  callBack("img/photo_top_title.jpg");
        }
      
        };
        /**
         * create path en params
         */
     var createPath = function(path, callBack){
    	
         var isWindowsPhone = ionic.Platform.isWindowsPhone();
       
            if(window.cordova){
             if (/Android|BlackBerry Mini/i.test(navigator.userAgent)) {
                 directoryRoot = cordova.file.applicationStorageDirectory;
             }else if (isWindowsPhone) {
            	 directoryRoot = "//";
             } else {
                 directoryRoot = cordova.file.documentsDirectory;
             }
             $cordovaFile.checkDir(directoryRoot, path)
                .then(function (success) {
                    directoryRoot = success.nativeURL;
                    callBack(success.nativeURL);
                }, function (error) {
                    // error
                    $cordovaFile.createDir(directoryRoot, path, true)
                    .then(function (success) {
                        // success
                        directoryRoot = success.nativeURL;

                        callBack(directoryRoot);

                    }, function (error) {
                        // error
                    });

                });
            }else{
            	callBack("");
            }
         

    	 
     };
     /**
      * check if photo exist in the good location
      */
     var checkExistFile = function (nameFile, callBack) {
         var isWindowsPhone = ionic.Platform.isWindowsPhone();
        
             if (window.cordova) {
                 if (/Android|BlackBerry Mini/i.test(navigator.userAgent)) {
                     path = cordova.file.applicationStorageDirectory;
                 }else if (isWindowsPhone) {
    	             path = "//";
	              } else {
                     path = cordova.file.documentsDirectory;
                 }
              
//                 $cordovaFile.checkDir(path, id)
//                 .then(function (success) {
//                     if (window.cordova) {
                         $cordovaFile.checkFile(path, nameFile)
                         .then(function (success) {
                             // success
                        	  if(window.localStorage.getItem('encours'+nameFile)){
                        		  callBack("img/photo_top_title.jpg"); 
                        	  }else{
                        		  callBack(success.nativeURL);	  
                        	  }
                           
                         }, function (error) {
                             // error
                        	 callBack("img/photo_top_title.jpg");

                         });
                     }
                     // success
//                 }, function (error) {
//                     // error
//                     callBack("img/photo_top_title.jpg");
//                 });
//
//             }else{
//            	  callBack("img/photo_top_title.jpg");
//             }
       
     };
      
   
   return {
	   getPicture : getPicture,
	   RenamePicture : RenamePicture,
	   downloadFile : downloadFile, 
	   createPath:createPath,
	   checkExistFile:checkExistFile,
	  };
}]);appContext.controller("ContactEditController", [
    '$scope',
    '$state',
    '$filter',
    'ContactsService',
    'LoadingService',
    '$ionicPlatform',
    '$cordovaSQLite',
    '$stateParams',
    '$rootScope',
    'cameraService',
    '$ionicHistory',
    'ConnectionService',
    'SynchroServices',
    '$cordovaKeyboard',
    'MenuService',
    '$ionicViewSwitcher',
    function($scope, $state, $filter, ContactsService, LoadingService,
            $ionicPlatform, $cordovaSQLite, $stateParams, $rootScope,
            cameraService,$ionicHistory,ConnectionService,SynchroServices,$cordovaKeyboard,MenuService,$ionicViewSwitcher) {

        $scope.showLast = false;
        $scope.tmp=false;
        $scope.isFocusable=false;
        var tmpContact ={};
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
        //sss
        //$ionicHistory.clearCache();
      });
    
      $scope.$on('$ionicView.beforeEnter', function( scopes, states ) {
    	  getContact();
      });
      /**
       * get infos contact by id
       */
      function getContact() {
        // remplir select box
        ContactsService.selectAllGroup(db, function(result) {
          $scope.groups = new Array();
          for (var i = 0; i < result.rows.length; i++) {
            $scope.groups[i] = result.rows.item(i).name;
          }
          $scope.groups[$scope.groups.length] = "Nouveau Groupe";
        });

        ContactsService.getContactbyId(db, $stateParams.id, function(result) {
        	if (result.rows.length > 0) {
        		$rootScope.tmpContact = angular.copy(result.rows.item(0)); 
                console.warn($rootScope.tmpContact);
                tmpContact = angular.copy(result.rows.item(0)); 
                $scope.contact = result.rows.item(0);
                $scope.contact.last_name = removeSlashes(result.rows.item(0).last_name);
                $scope.contact.first_name = removeSlashes(result.rows.item(0).first_name);
                $scope.contact.company = removeSlashes(result.rows.item(0).company);
                $scope.contact.list = removeSlashes(result.rows.item(0).list);
                $scope.contact.comment = removeSlashes(result.rows.item(0).comment);
                document.querySelector('#newGroupeName').value = removeSlashes(result.rows.item(0).list);
                $rootScope.oldGroupName = removeSlashes(result.rows.item(0).list);
                $scope.contact.lastsendemail =result.rows.item(0).lastsendemail;
                if( result.rows.item(0).lastsendemail !="")
              	  $scope.showLast = true;
                
               
//                var idProfil = $rootScope.idProfil;
//                cameraService.checkExistFile('dir'+idProfil, $scope.contact.id + '.jpg',function(url) {
//              	  var isWindowsPhone = ionic.Platform.isWindowsPhone();
//          		  if(isWindowsPhone){
//          			  $scope.photoProfil = url; // "img/photo_top_title.jpg";
//          		  }else{
//          			  $scope.photoProfil = url+ '?' + new Date().getTime(); // "img/photo_top_title.jpg";  
//          		  }
//                         
//                        });
                $scope.photoProfil = result.rows.item(0).photofilelocation;
               
                
             
              //  $scope.btnRDV.value =  new Date(result.rows.item(0).rendez_vous * 1000);
               
              
             // Use the picker object directly.
             var picker = $('#dateX').pickadate('picker');
               $scope.contact.rendez_vous = $filter('date')(new Date(result.rows.item(0).rendez_vous * 1000), 'dd/MM/yyyy');
               picker.set('select', new Date(result.rows.item(0).rendez_vous * 1000));
               picker.set('view', new Date(result.rows.item(0).rendez_vous * 1000));
               picker.set('highlight', new Date(result.rows.item(0).rendez_vous * 1000));
               
                if ($scope.contact.rendez_vous == '1900-01-01' || $scope.contact.rendez_vous == '1970-01-01') {

                  $scope.contact.rendez_vous = '';
                }
                
                $scope.tmp=true;
			} else {
				$state.go('app.contactList');
			}
          
        });
        LoadingService.dismiss();
      };
     
      /**
       * click on button valider: update contact
       */
     $scope.updateRDV = function(){
    	 
     }
      $scope.updateContact = function(contact) {
       // var dateRDV = $('#dateX').val();
    	
    	 contact.rendez_vous =$('#dateX').val();
        //cas de nouveau groupe & le champ est vide
        if (document.querySelector('#newGroupeName').value =="" && $scope.contact.list =="Nouveau Groupe") {
          LoadingService.error("Veuillez introduire un <br> nouveau nom du groupe","ContactEditController");
        
        //cas d'un groupe existant & le champ est vide
        }else if (document.querySelector('#newGroupeName').value =="" && $scope.contact.list !="Nouveau Groupe" && $scope.contact.list !="" && $scope.contact.list !=null) {
          LoadingService.error("Veuillez introduire un nom du groupe","ContactEditController");
          
         //tous les champs sont bien remplis 
        }else {
          
          /** begin initialisation */
          var contactObj = {};
          for(var key in contact)
            contactObj[key]=removeSlashes(contact[key]);
          var contactId = contact.id ;
          var oldName = contactObj.list;
          var newName = document.querySelector('#newGroupeName').value;
          contactObj.list = newName;
          console.warn("mmmm");
          console.warn(contactObj);
          /******* end *******/
          
          try {
            contactObj.rendez_vous = toUsFormat(contact.rendez_vous);
            // cas d'un nouveau groupe
            if ($scope.contact.list =="Nouveau Groupe" && !checkIfExist(newName,$scope.groups)){
              ContactsService.updateContactInfo(db, contactObj, function() { //update contact local
                ContactsService.insertIntoGroupTable(db,newName,function(){ //create new groupe local
                  ContactsService.selectContactByGroupName(db,$rootScope.oldGroupName,function(result){
                    //cas où l'ancien groupe sera vide
                      if (result.rows.length ==0){
                        ContactsService.deleteGroupByName(db,$rootScope.oldGroupName, function(result){
                          
                        });
                      }
                    });
                });
              });
            //cas rename groupe
            }else if(oldName != "Nouveau Groupe" && oldName != newName && newName !="" ) {
              ContactsService.updateContactInfo(db,contactObj , function() {   //update contact local
                ContactsService.editGroup(db,oldName,newName,function(result){ //edit groupe local
                  ContactsService.renameContactGroup(db,oldName,newName,function(result){ 

                    
                  });
                });
              });
            
          //cas nom de groupe existe déjà
          }else if($scope.contact.list =="Nouveau Groupe" && checkIfExist(newName,$scope.groups)){
            LoadingService.error("Ce nom de groupe existe déjà","ContactEditController");
            
            // cas de modification de groupe
          }else if(oldName !="Nouveau Groupe" && ((newName =="" && oldName == null) || (newName == oldName ))){
            ContactsService.updateContactInfo(db,contactObj , function() {   //update contact local
              ContactsService.selectContactByGroupName(db,$rootScope.oldGroupName,function(result){
              //cas où l'ancien groupe sera vide
                if (result.rows.length ==0){
                  ContactsService.deleteGroupByName(db,$rootScope.oldGroupName, function(result){
                    
                  });
                }
              });
            });
          }
          }catch (e) {
            // TODO: handle exception
          }
          
          //test de connection
          ConnectionService.isConnected(db,function() {
                    //cas connecté
                	LoadingService.loading("Enregistrement du contact en cours...");
                    //cas nouveau groupe
                    if ($scope.contact.list =="Nouveau Groupe" && !checkIfExist(newName,$scope.groups)){
                      
                     /******************************\
                      préparation de l'objet serveur 
                     \******************************/
                     var contactObjx = {};
                     for (var key in tmpContact)
                        if(contact[key] != tmpContact[key])
                          contactObjx[key] =contact[key];
                      contactObjx.list = newName;
                      delete contactObjx.rendez_vous;
                      delete contactObjx.id;
                      delete contactObjx.date;
                      /******* end *******/
                      if(!isEmpty(contactObjx)){
                      ContactsService.updateContactServer(0, contactId, contactObjx,function(data){ // update contact server
                        if (data.update.status =="done") {
                          LoadingService.dismiss();
//                          $ionicHistory.nextViewOptions({
//                        	  disableBack: true
//                        	});
//                         $state.go("app.contactList");
                          console.info($rootScope.tmpContact);
                          if(!areTheSame($rootScope.tmpContact,contact) )
                        	  MenuService.setLocalStorage('ReloadContactList',1);
                          $ionicViewSwitcher.nextDirection("back");
                          $state.go('app.contactShow', {id: contactId },{reload : true});
                          
                          //only for test
//                          MenuService.setLocalStorage('ReloadContactList',1);$state.go('app.contactList');
                        } else {
                          LoadingService.error("Une erreur est survenue lors <br> de la synchronisation","ContactEditController");
                        }
                      },function(status){
                        console.error(status);
                        LoadingService.error("Une erreur réseau est survenue ","ContactEditController");
                      });}
                      else{
                        LoadingService.dismiss();
//                        $ionicHistory.nextViewOptions({
//                      	  disableBack: true
//                      	});
//                      $state.go("app.contactList");
                        console.info($rootScope.contactTmp);
                        if(!areTheSame($rootScope.tmpContact,contact) )
                        	  MenuService.setLocalStorage('ReloadContactList',1);
                        $ionicViewSwitcher.nextDirection("back");
                          $state.go('app.contactShow', {id: contactId },{reload : true});
                        //only for test
//                        MenuService.setLocalStorage('ReloadContactList',1);$state.go('app.contactList');
                      }
                      
                    //cas rename groupe
                    }else if(oldName != "Nouveau Groupe" && oldName != newName && newName !="" ) {
                      ContactsService.updateGroupServer(oldName,newName, function(result){ //edit groupe server 
                        
                       /*******************************\
                        préparation de l'objet serveur
                       \*******************************/
                       var contactObjx = {};
                       for (var key in tmpContact)
                          if(contact[key] != tmpContact[key])
                            contactObjx[key] =contact[key];
                       
                        delete contactObjx.rendez_vous;
                        delete contactObjx.id;
                        delete contactObjx.date;
                        contactObjx.list = newName;
                        /******* end *******/
                        if(!isEmpty(contactObjx)){
                        ContactsService.updateContactServer(0,contactId, contactObjx,function(data){ // update contact server
                          if (data.update.status =="done") {
                            LoadingService.dismiss();
//                            $ionicHistory.nextViewOptions({
//                          	  disableBack: true
//                          	});
//                          $state.go("app.contactList");
                            console.info($rootScope.contactTmp);
                            if(!areTheSame($rootScope.tmpContact,contact) )
                          	  MenuService.setLocalStorage('ReloadContactList',1);
                            $ionicViewSwitcher.nextDirection("back");
                            $state.go('app.contactShow', {id: contactId },{reload : true});
                            //only for test
//                            MenuService.setLocalStorage('ReloadContactList',1);$state.go('app.contactList');
                          } else {
                            LoadingService.error("Une erreur est survenue lors <br> de la synchronisation","ContactEditController");
                          }
                        },function(status){
                          console.error(status);
                          LoadingService.error("Une erreur réseau est survenue ","ContactEditController");
                        });}
                        else{
                          LoadingService.dismiss();
//                          $ionicHistory.nextViewOptions({
//                        	  disableBack: true
//                        	});
//                        $state.go("app.contactList");
                          console.info($rootScope.contactTmp);
                          if(!areTheSame($rootScope.tmpContact,contact) )
                        	  MenuService.setLocalStorage('ReloadContactList',1);
                          $ionicViewSwitcher.nextDirection("back");
                          $state.go('app.contactShow', {id: contactId },{reload : true});
                          //only for test
//                          MenuService.setLocalStorage('ReloadContactList',1);$state.go('app.contactList');
                        }
                      });
                      //cas nom de groupe existe déjà
                    }else if($scope.contact.list =="Nouveau Groupe" && checkIfExist(newName,$scope.groups)){
                      LoadingService.error("Ce nom de groupe existe déjà","ContactEditController");
                      
                      // cas de modification de groupe
                    }else if(oldName !="Nouveau Groupe" && ((newName =="" && oldName == null) ||(newName == oldName ) )  ){
                      
                     /*******************************\
                      préparation de l'objet serveur
                     \*******************************/
                     var contactObjx = {};
                     for (var key in tmpContact)
                        if(contact[key] != tmpContact[key])
                          contactObjx[key] =contact[key];
                     
                      delete contactObjx.rendez_vous;
                      delete contactObjx.id;
                      delete contactObjx.date;
                      if(newName != oldName )
                      contactObjx.list = newName;
                      /******* end *******/
                      console.warn(contactObjx);
                      
                      if(!isEmpty(contactObjx)){
                      ContactsService.updateContactServer(0,contactId, contactObjx,function(data){ // update contact server
                        if (data.update.status =="done") {
                          LoadingService.dismiss();
//                          $ionicHistory.nextViewOptions({
//                        	  disableBack: true
//                        	});
//                        $state.go("app.contactList");
                          console.info($rootScope.tmpContact);
                          if(!areTheSame($rootScope.tmpContact,contact) )
                        	  MenuService.setLocalStorage('ReloadContactList',1);
                          $ionicViewSwitcher.nextDirection("back");
                          $state.go('app.contactShow', {id: contactId },{reload : true});
                          //only for test
//                          MenuService.setLocalStorage('ReloadContactList',1);$state.go('app.contactList');
                        } else {
                          LoadingService.error("Une erreur est survenue lors <br> de la synchronisation","ContactEditController");
                        }
                      },function(status){
                        console.error(status);
                        LoadingService.error("Une erreur réseau est survenue ","ContactEditController");
                    });}
                      else{
                    	  
                        LoadingService.dismiss();
//                        $ionicHistory.nextViewOptions({
//                      	  disableBack: true
//                      	});
//                      $state.go("app.contactList");
                        console.info($rootScope.tmpContact);
                        console.info(contact);
                        
                        if(!areTheSame($rootScope.tmpContact,contact) )
                      	  MenuService.setLocalStorage('ReloadContactList',1);
                        $ionicViewSwitcher.nextDirection("back");
                        $state.go('app.contactShow', {id: contactId },{reload : true});
                        //only for test
//                        MenuService.setLocalStorage('ReloadContactList',1);$state.go('app.contactList');
                      }
                    }
                    
                  }, function() {
                    
                  //cas non connecté
                    if (contact.id.toString().length == 10) {
//                      $state.go("app.contactList");
                    	if(!areTheSame($rootScope.tmpContact,contact) )
                      	  MenuService.setLocalStorage('ReloadContactList',1);
                    	$ionicViewSwitcher.nextDirection("back");
                    	 $state.go('app.contactShow', {id: contactId },{reload : true});
                        //only for test
//                        MenuService.setLocalStorage('ReloadContactList',1);$state.go('app.contactList');
//                      $ionicHistory.nextViewOptions({
//                        disableBack: true
//                      });
                      
                    } else {
                      LoadingService.loading("Enregistrement du contact en cours...");
                                          
                         /*******************************\
                          préparation de l'objet serveur
                         \*******************************/
                          if (oldName == null)
                            oldName="";
                          
                         var contactObjx = {};
                         for (var key in tmpContact)
                            if(contact[key] != tmpContact[key])
                              contactObjx[key] =contact[key];
                         
                          delete contactObjx.rendez_vous;
                          delete contactObjx.id;
                          delete contactObjx.date;
                          
                          contactObjx.list = newName;
                          /******* end *******/
                          //cas rename groupe //2 requete 
                          if(oldName != "Nouveau Groupe" && oldName != newName && newName !="") {
                            
                            SynchroServices.insertRequest(db,"RENAMEGROUP",{newName:newName,oldName:oldName},function(result){
                              if (!isEmpty(contactObjx)) {
                            console.info("not emptyy");
                                SynchroServices.insertRequest(db,"CONTACTEDIT",{id:$stateParams.id, contact:contactObjx},function(result){
      
                                  LoadingService.dismiss();
//                                $state.go("app.contactList");
                                  if(!areTheSame($rootScope.tmpContact,contact) )
                                	  MenuService.setLocalStorage('ReloadContactList',1);
                                  $ionicViewSwitcher.nextDirection("back");
                                  $state.go('app.contactShow', {id: contactId },{reload : true});
                                  //only for test
//                                  MenuService.setLocalStorage('ReloadContactList',1);$state.go('app.contactList');
//                                  $ionicHistory.nextViewOptions({
//                                	  disableBack: true
//                                	});
                                });
                              }else{
                                LoadingService.dismiss();
//                                $ionicHistory.nextViewOptions({
//                              	  disableBack: true
//                              	});
//                              $state.go("app.contactList");
                                if(!areTheSame($rootScope.tmpContact,contact) )
                              	  MenuService.setLocalStorage('ReloadContactList',1);
                                $ionicViewSwitcher.nextDirection("back");
                                $state.go('app.contactShow', {id: contactId },{reload : true});
                                //only for test
//                                MenuService.setLocalStorage('ReloadContactList',1);$state.go('app.contactList');
                              }
                            });
                          
                          }else if(!isEmpty(contactObjx)){ 
                            SynchroServices.insertRequest(db,"CONTACTEDIT",{id:$stateParams.id, contact:contactObjx},function(result){
                              LoadingService.dismiss();
//                              $ionicHistory.nextViewOptions({
//                            	  disableBack: true
//                            	});
//                            $state.go("app.contactList");
                              if(!areTheSame($rootScope.tmpContact,contact) )
                            	  MenuService.setLocalStorage('ReloadContactList',1);
                              $ionicViewSwitcher.nextDirection("back");
                              $state.go('app.contactShow', {id: contactId },{reload : true});
                              //only for test
//                              MenuService.setLocalStorage('ReloadContactList',1);$state.go('app.contactList');
                            });
                          }else {
                            LoadingService.dismiss();
//                            $ionicHistory.nextViewOptions({
//                          	  disableBack: true
//                          	});
//                          $state.go("app.contactList");
                            if(!areTheSame($rootScope.tmpContact,contact) )
                          	  MenuService.setLocalStorage('ReloadContactList',1);
                            $ionicViewSwitcher.nextDirection("back");
                            $state.go('app.contactShow', {id: contactId },{reload : true});
                            //only for test
//                            MenuService.setLocalStorage('ReloadContactList',1);$state.go('app.contactList');
                          }
                    }
                    
           });
        }
        

        
      };
      /**
       * click on button supprimer: delete contact
       */
      $scope.deleteContact = function() {
//    	  alert('XXXXXX');
        LoadingService.question("Voulez-vous vraiment supprimer ce contact ?",
                $stateParams.id, "ContactEditController");
      };

      /**
       * click on button Non (popup suppression)
       */
      $scope.no = function() {
        LoadingService.dismiss();
      };

      /**
       * click on button Yes (pop up suppression )
       */
      $scope.yes = function(params) {
//    	  alert('YYYYY');
        ContactsService.deleteContactLocal(db, params, function() {
          ContactsService.selectContactByGroupName(db,$rootScope.oldGroupName,function(result){ 
            //cas où l'ancien groupe sera vide
            if (result.rows.length ==0){
              ContactsService.deleteGroupByName(db,$rootScope.oldGroupName, function(result){
                console.log("group is empty : deleted");
              });
            }
          });
        });

        //test de connection
        ConnectionService.isConnected(db,function() {
          // cas connecté
          // TODO FIXME il faut traiter le cas ou la session est expiré
          LoadingService.loading("Suppression du contact en cours...");
          
          ContactsService.deleteContactServer(params,function(data){
            
            if (data.update.status =="done") {
              LoadingService.dismiss();
//            $state.go("app.contactList");
              //only for test
              MenuService.setLocalStorage('ReloadContactList',1);
              $state.go('app.contactList');
            } else {
              LoadingService.error("Une erreur est survenue lors <br> de la synchronisation","ContactEditController");
            }
            
          },function(status){
            console.error(status);
            LoadingService.error("Une erreur réseau est survenue ","ContactEditController");
          });
          
        }, function() {
          //cas non connecté
          SynchroServices.insertRequest(db,"CONTACTDELETE",{id:$stateParams.id},function(){

            LoadingService.dismiss();
//            $ionicHistory.nextViewOptions({
//          	  disableBack: true
//          	});
//          $state.go("app.contactList");
            //only for test
//            $state.go("app.contactList", {}, { reload: true,inherit: false,notify: true,cache:false });
            MenuService.setLocalStorage('ReloadContactList',1);
            $state.go('app.contactList');
          });
            
        });
      };
      /**
       * convert date to timeStamp
       */
      function toTimeStamp(myDate) {
        myDate = myDate.split("-");
        var newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
        x = new Date(newDate).getTime() / 1000;
        return x;

      }
      /**
       * capture photo
       */
      $scope.getPhoto = function() {
    	  var options = {
    			  quality: 100,
    		      destinationType: Camera.DestinationType.FILE_URI,
    		      sourceType: Camera.PictureSourceType.CAMERA,
    		      encodingType: Camera.EncodingType.JPEG,
    		      targetWidth: 500,
                  targetHeight: 500,
                  correctOrientation: true,
                  popoverOptions: CameraPopoverOptions
    		    };

        cameraService.getPicture(options).then(function(imageURI) {
        	 LoadingService.loading("Chargement...");
         // var idProfil = $rootScope.idProfil;
          var isWindowsPhone = ionic.Platform.isWindowsPhone();
          var fileName =$stateParams.id + '.jpg';
          $scope.photoProfil = imageURI;
          var imageURL =imageURI.substr(0, imageURI.lastIndexOf('?'));
          if (imageURL =='') {
           imageURL = imageURI;
          }else{
           imageURL = imageURI.substr(0, imageURI.lastIndexOf('?'));
          }
          cameraService.RenamePicture(fileName, imageURL, function(url) {
        	   if (isWindowsPhone) {
         		  $scope.photoProfil = url;
         		  $scope.contact.photofilelocation= url;
         		  
         	  }else{
         		  $scope.photoProfil = url + '?' + new Date().getTime();
         		  $scope.contact.photofilelocation = url + '?' + new Date().getTime();
         	  }
        	
           
            
            ContactsService.updateContactPhoto(db, $stateParams.id,url, function(){
            ///mettre a jour le rootscope de list photo contact
            ConnectionService.isConnected(db,function() {
            	//cas ou il ya connexion 
            	  ContactsService.uploadPhotoContact(url, $stateParams.id, function(){
            		  LoadingService.dismiss();
                  	console.log('uploaded CONTACTPHOTO');
                  }, function(){
                	  LoadingService.dismiss();
                	  console.log('erreur upload photo contact');
                  });
            },function(){
            	// cas pas de connexion 
            	 SynchroServices.insertRequest(db, "CONTACTPHOTO", {id:$stateParams.id, path:url}, function() {
            		 LoadingService.dismiss();
            		 console.log('Request inserted CONTACTPHOTO');
            });
          
         });
            
            });
          });
        }, function(err) {
          console.error(err);
        });
      };
      /**
       * choose file from library
       */
      $scope.choseFile = function() {
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 500,
          targetHeight: 500,
          correctOrientation: true,
          popoverOptions: CameraPopoverOptions
        };

        cameraService.getPicture(options).then(function(imageURI) {
        	 LoadingService.loading("Chargement...");
        	  var isWindowsPhone = ionic.Platform.isWindowsPhone();
              var fileName =$stateParams.id + '.jpg';
              $scope.photoProfil = imageURI;
              var imageURL =imageURI.substr(0, imageURI.lastIndexOf('?'));
              if (imageURL =='') {
               imageURL = imageURI;
              }else{
               imageURL = imageURI.substr(0, imageURI.lastIndexOf('?'));
              }
              cameraService.RenamePicture(fileName, imageURL, function(url) {
            	   if (isWindowsPhone) {
             		  $scope.photoProfil = url;
             		  $scope.contact.photofilelocation= url;
             		  
             	  }else{
             		  $scope.photoProfil = url + '?' + new Date().getTime();
             		  $scope.contact.photofilelocation = url + '?' + new Date().getTime();
             	  }
            	
               
                
        	  ContactsService.updateContactPhoto(db, $stateParams.id,$scope.photoProfil, function(){
        		
        	  ConnectionService.isConnected(db,function() {
              	//cas ou il ya connexion 
        		 
              	  ContactsService.uploadPhotoContact(url, $stateParams.id, function(){
              		LoadingService.dismiss();
              		  console.log('uploaded CONTACTPHOTO');
                    }, function(){
                  	  console.log('erreur upload photo contact');
                    });
              },function(){
              	// cas pas de connexion 
              	 SynchroServices.insertRequest(db, "CONTACTPHOTO", {id:$stateParams.id, path:url}, function() {
              		LoadingService.dismiss();
              		 console.log('Request inserted CONTACTPHOTO');
              });
            
           });
        	  
           
          
        	  });
          });
        }, function(err) {
          console.error(err);
        });

      };
      
     
      /**
       * select box handler
       */
      $scope.changeHandler = function() {
        if ( $scope.contact.list != "Nouveau Groupe") {
          document.querySelector('#newGroupeName').value = $scope.contact.list;
        }else{
          $scope.isFocusable=true;
          document.querySelector('#groupe-combo-editcontact').style.height = '80px';
          document.querySelector('#newGroupeName').value = "";
//          document.querySelector('#newGroupeName').focus();
        }
      };
    
      // to dismiss the PopUp
      $scope.dismiss = function() {
        LoadingService.dismiss();
        
      };
      
//      $scope.closeKeyboard = function(){
//    	  $cordovaKeyboard.close();
//      }
//      
//      $scope.keyPressed = function(keyEvent) {
//          if (keyEvent.keyCode == 13) {
//            
////             cordova.plugins.Keyboard.close();
//          }
//      };
      
      function checkIfExist(string,array){  
        if(string !="" && array.length>0){
          var exist = false;
         for (var int = 0; int < array.length; int++) {
           if (array[int] == string) 
             exist =true;
         } 
         return exist;
        }else return false;
      }
      
      function isEmpty(value){
        return Boolean(value && typeof value == 'object') && !Object.keys(value).length;
      };
      
      function toUsFormat(dateTimeStamp){
    
    	var n =  new Date(dateTimeStamp.substr(6,4),parseInt(dateTimeStamp.substr(3,2))-1,dateTimeStamp.substr(0,2));
    		//new Date(dateTimeStamp);
  		var x = (n.getMonth() + 1) +"/" +  n.getDate() +"/" +  n.getFullYear();
  		console.error(x);
    	return (n.getMonth() + 1) +"/" +  n.getDate() +"/" +  n.getFullYear();
      };
      
      
      function areTheSame(obj1, obj2){
    	  var d1 = new Date(obj1.rendez_vous * 1000);
    	  var d2 = new Date(obj2.rendez_vous);
    	  console.log(d1);
    	  console.log(d2);
    	  if(d1.getTime() != d2.getTime()){
    		  console.log("d1 is not d2");
    		  return false;
    	  }
    		  
    	  else{
    		  delete obj1.rendez_vous;
    		  delete obj2.rendez_vous;
    		  console.error(obj1);
    		  if(JSON.stringify(obj1) === JSON.stringify(obj2)){
    			  console.log("obj1 ==== D2");
    			  return true;
    		  }
    			  
    		  else{
    			  console.log("d1 ==@##=== D2");
    			  return false;
    		  }
    			 
    	  }
    	  
      }
    }]);appContext.factory("ContactsService", ['$http','$cordovaSQLite','LoadingService','cameraService','$rootScope','$cordovaFile','LoginService','MenuService', function($http,$cordovaSQLite, LoadingService,cameraService,$rootScope,$cordovaFile,LoginService,MenuService) {
  
	
	
  /**
   * get contacts list from server 
   */
  var getContacts = function(page) {
    

    // the request parameters
    var loginRequest = {
      method: 'POST',
      // we should use contact_mobile.aspx to get 600 contact per packet 
      url: 'http://buzcard.fr/contacts_mobile.aspx?request=contacts&lot=600',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: function(obj) {
        var str = [];
        for ( var p in obj)
          str.push(encodeURIComponent(p) + "="+ encodeURIComponent(obj[p]));
        return str.join("&");
      },
      transformResponse: function(data) {
        var x2js = new X2JS();
        var json = x2js.xml_str2json(data);
        return json;
      },
      data: {
        sorting_order:"desc", 
        sorting_criterion:"date",
        page:page
      },
//      timeout: 4000,
    };
    // the HTTP request
    return $http(loginRequest);
  };
  /**
   * get contactModifier from serveur
   */
 
  var getContactsEdited = function() {
	  var dateSynchronisation = MenuService.getLocalStorage("dateSynchronisation");
	  var url="";
	  if(dateSynchronisation !=false){
		url= 'http://buzcard.fr/contacts_mobile.aspx?request=contacts&modificationdate='+dateSynchronisation ;
	  }else{
		url = 'http://buzcard.fr/contacts_mobile.aspx?request=contacts';
	  }

    // the request parameters
    var loginRequest = {
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformResponse: function(data) {
        var x2js = new X2JS();
        var json = x2js.xml_str2json(data);
        return json;
      },
     
//      timeout: 4000,
    };
   
    console.warn(url);
    // the HTTP request
    return $http(loginRequest);
  };
  
  /**
   *
   * get group list from server 
   */
  var getGroup = function() {
    
    // the request parameters
    var getGroupRequest = {
      method: 'GET',
      url: 'http://buzcard.fr/contacts.aspx?request=lists',
      transformResponse: function(data) {
        var x2js = new X2JS();
        var json = x2js.xml_str2json(data);
        return json;
        
      },
//      timeout: 4000,
    };
    // the HTTP request
    return $http(getGroupRequest);
  };
  
  /**
   * create group table
   */
  var createGroupTable = function(db,callBack) {
    var createGroupeQuery = 'CREATE TABLE IF NOT EXISTS groupe ('+
    'id INTEGER PRIMARY KEY, '+
    'name text)';
    try {
        $cordovaSQLite.execute(db, createGroupeQuery).then(function(value) {
        	return callBack();
        }, function(reason) {
          console.log(reason);
        }, function(value) {
          
        });
        return 0;
      } catch (e) {
        console.log(e);
        return 1;
      }
  };
  
  /**
   * empty the group table 
   */
  var emptyGroupTable = function(db,callBack){
    
    var query ="DELETE FROM groupe";
    $cordovaSQLite.execute(db, query).then(function(value) {
      return callBack();
    }, function(reason){
      console.log(reason);
    }, function(value){
    	
    });
  };
  /**
   * empty the contact table 
   */
  var emptyContactTable = function(db,callBack){
    
    var query ="DELETE FROM contact";
    $cordovaSQLite.execute(db, query).then(function(value) {
      return callBack();
    }, function(reason){
      console.log(reason);
    }, function(value){
      
    });
  };
  
  /**
   * create contacts table
   */
  var createContactsTable = function(db,callBack){
    
    var createContactQuery = 'CREATE TABLE IF NOT EXISTS contact ('+
    'id INTEGER, '+
    'rendez_vous integer, email text, date INTEGER, comment text, '+
    'last_name text, first_name text, phone_1 text, phone_2 text,company text, '+
    'list TEXT, status text,lastsendemail text,LanguageText text,firstsendemail text, photofilelocation text,modificationdate text)';
    
    try {
          $cordovaSQLite.execute(db, createContactQuery).then(function(value) {
          	return callBack();
          }, function(reason) {
            console.log(reason);
          }, function(value) {
            
          });
          return 0;
        } catch (e) {
          
          console.log(e);
          return 1;
        }
  };
  
  /**
   * insert into group table
   */
  var insertIntoGroupTable= function(db,groupName,callBack) {
    var insertQuery = 'INSERT INTO groupe (id,name) VALUES ((select Max(id) from groupe)+1 ,"'+groupName+'")';
    try {
      console.warn(insertQuery);
      $cordovaSQLite.execute(db, insertQuery).then(function(value) {
        
        return callBack();
      }, function(reason) {
      	console.log(reason);
      }, function(value) {
        
      });
      return 0;
    } catch (e) {
      console.log(e);
      return 1;
    }
  };
  
  /**
   * insert a single contatc into contacts
   */
  var insertIntoContactsTable = function(db,contact,callBack) {
	  console.log("+++++ insertIntoContactsTable ++++++++");
    var insertQuery = 'INSERT INTO contact (id,rendez_vous, email, date, comment,' +
    'last_name, first_name, phone_1, phone_2, company, '+
    'list, status,lastsendemail, LanguageText,firstsendemail,photofilelocation,modificationdate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
   console.warn(insertQuery);
    try {
      var parameters = [contact.id,toTimeStamp(contact.rendez_vous),contact.email,contact.date,addSlashes(contact.comment),
                        addSlashes(contact.last_name),addSlashes(contact.first_name),contact.phone_1,contact.phone_2,
                        addSlashes(contact.company),addSlashes(contact.list),contact.status,contact.lastsendemail,contact.LanguageText,contact.firstsendemail,contact.photofilelocation,contact.modificationdate];
      console.warn(parameters);
      $cordovaSQLite.execute(db, insertQuery,parameters).then(function(value) {
    	  console.log("callback ok+++");
        return callBack();
      }, function(reason) {
      	console.log(reason);
      }, function(value) {
      	
      });

      return 0;
    } catch (e) {
      console.log(e);
      return 1;
    }
  };
  /**
   * insert an array of contact into contacts
   */
  var insertBulkIntoContactsTable = function(db, counter, contactArray, callBack) {

  	
  	if(counter==0 ){
  		if(contactArray.length < 200)
  		var n=contactArray.length;
  		else
  		var n=200;
  		
  		var j=0;
  	}
  	else if(counter==1 ){
  		if(contactArray.length < 400)
  	  		var n=contactArray.length;
  	  		else
  	  		var n=400;
  		
  		var j=200;
  	}
  	else if(counter==2){
  		var j=400;
  		var n=contactArray.length;
  	}
  		
  	var insertQuery = "INSERT INTO contact " + " SELECT '" + contactArray[j].id
  			+ "' AS 'id', '" + toTimeStamp(contactArray[j].rendez_vous)
  			+ "' AS 'rendez_vous','" + contactArray[j].email + "' AS 'email','"
  			+ contactArray[j].date + "' AS 'date','"
  			+ addSlashes(contactArray[j].comment) + "' AS 'comment', '"
  			+ addSlashes(contactArray[j].last_name) + "' AS 'last_name','"
  			+ addSlashes(contactArray[j].first_name) + "' AS 'first_name','"
  			+ contactArray[j].phone_1 + "' AS 'phone_1','"
  			+ contactArray[j].phone_2 + "' AS 'phone_2','"
  			+ addSlashes(contactArray[j].company) + "' AS 'company','"
  			+ addSlashes(contactArray[j].list) + "' AS 'list','"
  			+ contactArray[j].status + "' AS 'status','"
  			+ contactArray[j].lastsendemail + "' AS 'lastsendemail','"
  			+ contactArray[j].LanguageText + "' AS 'LanguageText', '"
  			+ contactArray[j].firstsendemail + "' AS 'firstsendemail', '"
  			+ contactArray[j].photofilelocation + "' AS 'photofilelocation', '"
  			+ contactArray[j].modificationdate + "' AS 'modificationdate'";

  	for (j+1; j < n; j++) {
  		insertQuery = insertQuery + "  UNION SELECT '"
  				+ contactArray[j].id + "','"
  				+ toTimeStamp(contactArray[j].rendez_vous) + "', '"
  				+ contactArray[j].email + "','"
  				+ contactArray[j].date + "', '"
  				+ addSlashes(contactArray[j].comment) + "', '"
  				+ addSlashes(contactArray[j].last_name) + "', '"
  				+ addSlashes(contactArray[j].first_name) + "', '"
  				+ contactArray[j].phone_1 + "', '"
  				+ contactArray[j].phone_2 + "', '"
  				+ addSlashes(contactArray[j].company) + "', '"
  				+ addSlashes(contactArray[j].list) + "', '"
  				+ contactArray[j].status + "','"
  				+ contactArray[j].lastsendemail + "','"
  				+ contactArray[j].LanguageText + "','"
  				+ contactArray[j].firstsendemail + "' ,'"
  				+ contactArray[j].photofilelocation + "', '"
  				+ contactArray[j].modificationdate + "'";
  	}
  	try {
  		$cordovaSQLite.execute(db, insertQuery).then(
  				function(value) {
  					if (contactArray.length > n) {
  						return insertBulkIntoContactsTable(db, ++counter,
  								contactArray, callBack);
  					} else {
  						return callBack();
  					}

  				}, function(reason) {

  					console.warn(insertQuery);
  					console.log(reason);
  				}, function(value) {

  				});

  		return 0;
  	} catch (e) {
  		console.log(e);
  		return 1;
  	}
  };
  /**
   * select info contact by id-contact 
   */
  var getContactbyId = function(db,id, callBack){
	  try {
	      
	      var query = 'SELECT * FROM contact where id='+id;
	      console.warn(query);
	      $cordovaSQLite.execute(db, query).then(function(result) {
	         
	          return callBack(result);
	        }, function(reason) {
	        	//TODO FIXME 
	          console.log("error " + reason);
	          return 1;
	        });
	     
	    } catch (e) {
	      console.log(e);
	      return 1;
	    }
  	};
  /**
   * update info contact en local
   */
  var updateContactInfoDateModification = function(db, contact, callBack){
	  
	  try{
		  
	  var updateQuery = " UPDATE contact SET  "+
	          //TODO FIXME est ce que c'est bien un timestamp ?
	  				"rendez_vous ='"+toTimeStamp(contact.rendez_vous)+"', " +
	  				"first_name = '"+addSlashes(contact.first_name)+"', " +
	  				"last_name  = '"+addSlashes(contact.last_name)+"', "+
	  				"email = '"+contact.email+"', "+
	  				"phone_1 ='"+contact.phone_1+"', "+
	  				"phone_2 ='"+contact.phone_2+"', "+
	  				"company ='"+addSlashes(contact.company)+"', "+
	  				"list ='"+addSlashes(contact.list)+"', "+
	  				"comment ='"+addSlashes(contact.comment)+"', "+
	  				"modificationdate ='"+contact.modificationdate+"'"+
	  				"where id="+contact.id+"";
	  console.warn(updateQuery);
	  $cordovaSQLite.execute(db, updateQuery).then(function(results){
	    	
	    	callBack();
	 
    	  
      }, function(reason) {
          console.log(reason);
          return 1;
      }, function(value) {
    	
       console.log(value);
       return 1;
      });
      
      return 0;
    } catch (e) {
      console.log(e);
      return 1;
    }
  };
  /**
   * update info contact en local
   */
  var updateContactInfo = function(db, contact, callBack){
	  try{
		  
		  var updateQuery = " UPDATE contact SET  "+
		  //TODO FIXME est ce que c'est bien un timestamp ?
		  "rendez_vous ='"+toTimeStamp(contact.rendez_vous)+"', " +
		  "first_name = '"+addSlashes(contact.first_name)+"', " +
		  "last_name  = '"+addSlashes(contact.last_name)+"', "+
		  "email = '"+contact.email+"', "+
		  "phone_1 ='"+contact.phone_1+"', "+
		  "phone_2 ='"+contact.phone_2+"', "+
		  "company ='"+addSlashes(contact.company)+"', "+
		  "list ='"+addSlashes(contact.list)+"', "+
		  "LanguageText='"+contact.LanguageText+"', "+
		  "lastsendemail='"+contact.lastsendemail+"', "+
		  "firstsendemail='"+contact.firstsendemail+"', "+
		  "photofilelocation='"+contact.photofilelocation+"', "+
		  "comment ='"+addSlashes(contact.comment)+"',"+
		  "modificationdate ='"+contact.modificationdate+"'"+
		  "where id="+contact.id+"";
		  console.warn(updateQuery);
		  $cordovaSQLite.execute(db, updateQuery).then(function(results){
			  
			  callBack();
			  
			  
		  }, function(reason) {
			  console.log(reason);
			  return 1;
		  }, function(value) {
			  
			  console.log(value);
			  return 1;
		  });
		  
		  return 0;
	  } catch (e) {
		  console.log(e);
		  return 1;
	  }
  };
  /**
   *   update contact server
   */
  var updateContactServer = function(i,contactId, contact,callBack,errorCallBack){
    
     var length =0;
     for(j in contact){
       if(length == i)   key = j;
       length++;
     }
   // the send request parameters
    var request = {
      method: 'POST',
      url: 'http://buzcard.fr/contacts.aspx?request=update',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: function(obj) {
        var str = [];
        for ( var p in obj)
          str.push(encodeURIComponent(p) + "="
                  + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      transformResponse: function(data) {
        var x2js = new X2JS();
        var json = x2js.xml_str2json(data);
        return json;
      },
      data: {
        contact_id:contactId,
        field : key,
        value : contact[key]
      },
//      timeout : 5000,
    };
    
    $http(request).success(function(data, status, headers, config) {
      if(i<length){
        i++;
        updateContactServer(i, contactId, contact,callBack,errorCallBack);
      }else{
        callBack(data);
      } 
    }).error(function(data, status, headers, config) {
      errorCallBack(status);
    });
  };
  /**
   *  remove contact
   */
  var deleteContactServer = function(id,callBack,errorCallBack){
    
    // the send request parameters
    var request = {
            method: 'POST',
            url: 'http://buzcard.fr/contacts.aspx?request=update',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
              var str = [];
              for ( var p in obj)
                str.push(encodeURIComponent(p) + "="
                        + encodeURIComponent(obj[p]));
              return str.join("&");
            },
            transformResponse: function(data) {
              var x2js = new X2JS();
              var json = x2js.xml_str2json(data);
              return json;
            },
            data: {
              contact_id:id,
              field : "status",
              value : "deleted"
            },
//            timeout : 5000,
    };
    
    $http(request).success(function(data, status, headers, config) {
        callBack(data);
    }).error(function(data, status, headers, config) {
      errorCallBack(status);
    });
  };

 
  /**
   * delete contact by id en local 
   */
  var deleteContactLocal = function(db, idContact, callBack){
	  try{
		  
		  var deleteQuery = " UPDATE contact SET  "+
		  				"status = 'deleted' " +
		  				"where id="+idContact;
		  console.log("Query "+deleteQuery);
		  $cordovaSQLite.execute(db, deleteQuery).then(function(results){
		    	 console.log('success');
	    	  callBack();
	      }, function(reason) {
	          console.log(reason);
	          return 1;
	      }, function(value) {
	    	
	       console.log(value);
	       return 1;
	      });
	      
	      return 0;
	    } catch (e) {
	      console.log(e);
	      return 1;
	    }
	  };
  /**
   *  get contacts with limits and range  
   */
  var selectContacts = function(db,page,callBack) {
    var selectQuery = "SELECT * FROM contact WHERE status != 'deleted'  order by date DESC LIMIT 10 OFFSET "+parseInt(10*(page-1));
    try {
      $cordovaSQLite.execute(db, selectQuery).then(function(value) {
        console.warn(selectQuery);
        return callBack(value);
      }, function(reason) {
        console.log(reason);
      }, function(value) {
        console.warn(value);
      });
    } catch (e) {
      // TODO: FIXME handle exception
      return 0;
    }
  };
  /**
   *  get followers with limits and range 
   */
  var selectFollowers = function(db,page,callBack) {
    var selectQuery = "SELECT * FROM contact WHERE status = 'selected'  order by date DESC LIMIT 10 OFFSET "+parseInt(10*(page-1));
    try {
      $cordovaSQLite.execute(db, selectQuery).then(function(value) {
        console.warn(selectQuery);
        return callBack(value);
      }, function(reason) {
        console.log(reason);
      }, function(value) {
        console.warn(value);
      });
    } catch (e) {
      // TODO: FIXME handle exception
      return 0;
    }
  };
  
  /**
   * get the contacts count with the given status criteria 
   */
  var getCountOfContact = function(db,status,callBack) {
    var selectQuery = "SELECT count (*) FROM contact WHERE status = '"+status+"'";
    try {
      $cordovaSQLite.execute(db, selectQuery).then(function(result) {
        console.warn(selectQuery);
        return callBack(result);
      }, function(reason) {
        console.log(reason);
      }, function(value) {
        console.warn(value);
      });
    } catch (e) {
      // TODO: FIXME handle exception
      return 0;
    }
  };
  
  /**
   * get the à recontacter
   */
  var selectRecontact = function(db,callBack){
    
    var selectQuery = "SELECT * FROM contact where status != 'deleted' and  rendez_vous >= "+nowInTimeStamp()+" and rendez_vous <= "+weekEnd();
    try {
      $cordovaSQLite.execute(db, selectQuery).then(function(result) {
        console.warn(selectQuery);
        return callBack(result);
      }, function(reason) {
        console.log(reason);
      }, function(value) {
        console.warn(value);
      });
    } catch (e) {
      // TODO: FIXME handle exception
      return 0;
    }
  };
  /**
   * select * from groupe
   */
  var selectAllGroup = function(db,callBack){
    var selectQuery = "SELECT * FROM groupe order by name COLLATE NOCASE";
    try {
      $cordovaSQLite.execute(db, selectQuery).then(function(result) {
        console.warn(selectQuery);
        return callBack(result);
      }, function(reason) {
        console.log(reason);
      }, function(value) {
        console.warn(value);
      });
    } catch (e) {
      // TODO: FIXME handle exception
      return 0;
    }
  };
  
  /**
   * select contacts per group
   */
  var selectContactsByGroup = function(db,groupName,callBack) {
    var selectQuery = "SELECT * FROM contact where status != 'deleted' and list = '"+groupName+"'";
    try {
      $cordovaSQLite.execute(db, selectQuery).then(function(result) {
        console.warn(selectQuery);
        return callBack(result);
      }, function(reason) {
        console.log(reason);
      }, function(value) {
        console.warn(value);
      });
    } catch (e) {
      // TODO: FIXME handle exception
      return 0;
    }
  };
  /**
   * search function
   */
  var searchContact = function(db,criteria,callBack) {
    var selectQuery = "SELECT * FROM contact WHERE ( email LIKE '%"+criteria+"%' OR last_name LIKE '%"+criteria+"%' OR first_name LIKE '%"+criteria+"%' OR comment LIKE '%"+criteria+"%') AND status!='deleted' LIMIT 10  ";
    try {
      $cordovaSQLite.execute(db, selectQuery).then(function(result) {
        console.warn(selectQuery);
        return callBack(result);
      }, function(reason) {
        console.log(reason);
      }, function(value) {
        console.warn(value);
      });
    } catch (e) {
      // TODO: FIXME handle exception
      return 0;
    }
  };
  /**
   * downloadPhotoContact
   */
  var downloadPhotoContact = function (id, callBack) {


          var idProfil = $rootScope.idProfil;
          // if (window.cordova){
          var isWindowsPhone = ionic.Platform.isWindowsPhone();
         
          if (window.cordova) {
              var path = "";
              if (/Android|BlackBerry Mini/i.test(navigator.userAgent)) {
                  path = cordova.file.externalRootDirectory;
              }else if (isWindowsPhone) {
 	             path = "/";
              } else {
                  path = cordova.file.documentsDirectory;
              }
              var PathFile = path;
//              cameraService.checkExistFile('dir'+idProfil, id + '.jpg', function (url) {
//                  //file does not exist 
//                  if (url == "img/photo_top_title.jpg") {
//
//                      cameraService.createPath('dir'+idProfil, function (PathFile) {
                          var fileLocation = $rootScope.fileLocaltion;
                          var url = "http://buzcard.fr/" + fileLocation + "contacts/" + id + "/imgThumbnail.jpg";

                          cameraService.downloadFile(PathFile, id + '.jpg', url, function (urlImage) {
                        	  if(urlImage == "img/photo_top_title.jpg"){
                        		  
                        		  callBack(urlImage);  
                        	  }else{
                        		  callBack(urlImage + '?' + new Date().getTime());
                        	  }
                             
                          });
                   //   });

//                  } else {
//                      // file exist 
//                      callBack(url + '?' + new Date().getTime());
//                  }
//              });
          }else{
        		
      		  callBack(urlImage);    
         
          }
  };
  
  /**
   * remplir le tableau
   */
  var getAllContactsByGroup = function(db,$scope,n,callBack) {
    var selectNbPages = "SELECT count(*) as nbr FROM contact where status != 'deleted' and list !='' group by list order by list COLLATE NOCASE ";
    console.error(selectNbPages);
    try {
      $cordovaSQLite.execute(db, selectNbPages).then(function(result) {
        console.warn(selectNbPages);
        var count = 0;
    	for (var int = 0; int < result.rows.length; int++) {
    		$scope.groups[int].nbr = result.rows.item(int).nbr;
    	}
      }, function(reason) {
        console.log(reason);
      }, function(value) {
        console.warn(value);
      });
    } catch (e) {
      // TODO: FIXME handle exception
      return 0;
    }
    var selectQuery = "SELECT * FROM (SELECT * FROM contact contact where status != 'deleted' and list !='' order by date DESC) order by list  COLLATE NOCASE";
    try {
      $cordovaSQLite.execute(db, selectQuery).then(function(result) {
        console.warn(selectQuery);
        var count = 0;
    	for (var int = 0; int < result.rows.length; int++) {
    		if( $scope.groups[count].name == result.rows.item(int).list){
    			if( $scope.groups[count] && $scope.groups[count].items.length < 10 ){
    				var tmp= result.rows.item(int);
    				$scope.groups[count].items.push(tmp);
    			}
    		}else{
    			count++;
    			if( $scope.groups[count] && $scope.groups[count].items.length < 10 ){
    				var tmp= result.rows.item(int);
    				$scope.groups[count].items.push(tmp);
    			}
    			else
    				return false;
    		}
    	}
    	callBack();
      }, function(reason) {
        console.log(reason);
      }, function(value) {
        console.warn(value);
      });
    } catch (e) {
      // TODO: FIXME handle exception
      return 0;
    }
    
  };
  
  /**
   *  edit groupe name in db
   */
  var editGroup = function(db,oldName, newName, callBack){
    var query = "update groupe set name = '"+newName+"' where name='"+oldName+"'";
    $cordovaSQLite.execute(db, query).then(function(result) {
      console.warn(query);
      return callBack(result);
    }, function(reason) {
      console.log(reason);
    }, function(value) {
      console.warn(value);
    });
  };
  
  /**
   *   update group on server
   */
  var updateGroupServer = function(oldName, newName,callBack,errorCallBack){
    
   // the send request parameters
    var request = {
      method: 'POST',
      url: 'http://buzcard.fr/contacts.aspx?request=rename_list',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: function(obj) {
        var str = [];
        for ( var p in obj)
          str.push(encodeURIComponent(p) + "="
                  + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      transformResponse: function(data) {
        var x2js = new X2JS();
        var json = x2js.xml_str2json(data);
        return json;
      },
      data: {
        old_name:oldName,
        new_name : newName
      },
//      timeout : 5000,
    };
    
    $http(request).success(function(data, status, headers, config) {
       return callBack(data);
    }).error(function(data, status, headers, config) {
      return errorCallBack(status);
    });
  };
  
  /**
   *  edit contacts groupe name in db
   */
  var renameContactGroup = function(db,oldName, newName, callBack){
    var query = "update contact set list ='"+newName+"' where id IN (select id from contact where list='"+oldName+"')";
    $cordovaSQLite.execute(db, query).then(function(result) {
      console.warn(query);
      return callBack(result);
    }, function(reason) {
      console.log(reason);
    }, function(value) {
      console.warn(value);
    });
  };
  
  
  /**
   *  select contact bu group name
   */
  var selectContactByGroupName = function(db,GroupName, callBack){
    var query = "select * from contact where list='"+GroupName+"' AND status !='deleted' ";
    $cordovaSQLite.execute(db, query).then(function(result) {
      console.warn(query);
      return callBack(result);
    }, function(reason) {
      console.log(reason);
    }, function(value) {
      console.warn(value);
    });
  };
  /**
   *  delete group by name
   */
  var deleteGroupByName = function(db,GroupName, callBack){
    var query = "delete from groupe where name='"+GroupName+"'";
    $cordovaSQLite.execute(db, query).then(function(result) {
      console.warn(query);
      return callBack(result);
    }, function(reason) {
      console.log(reason);
    }, function(value) {
      console.warn(value);
    });
  };
  
  /**
   * get credit de parrainnage
   */
  var getCreditParrainage = function(callBack){
    var credit =0;
    // the send request parameters
    var request = {
      method: 'GET',
      url: 'http://buzcard.fr/contacts.aspx',
      transformResponse: function(data) {
        
        $(data).find('.sponsor').each(function(){
          var tmpArray = ($(this).text()).split(":");
           credit = tmpArray[1];
        });
        return credit;
      },

    };
    $http(request).success(function(data, status, headers, config) {
    	return callBack(data);
    });
  };
  
  /**
   * select contact by email
   */
  var selectContactbyEmail = function(db,email, callBack){
    try {
        
        var query = "SELECT * FROM contact where email='"+email+"' COLLATE NOCASE";
        console.warn(query);
        $cordovaSQLite.execute(db, query).then(function(results) {
           
            return callBack(results);

          }, function(reason) {
            //TODO FIXME 
            console.log("error " + reason);
            return 1;
          });
       
      } catch (e) {
        console.log(e);
        return 1;
      };
    };
    
    
    /**
     * 
     */
    var updateContactIdByEmail = function(db,email,id,callBack){
        var updateQuery = "UPDATE contact SET id = "+id+" where email='"+email+"'";
      
      console.warn(updateQuery);
      $cordovaSQLite.execute(db, updateQuery).then(function(result){
        return callBack();
      }, function (err) {
        console.error(err);
      });
      
    };
    
    
    /**
     * 
     */
    var updateContactStatus = function(db,id,follower,callBack){
      var updateQuery ="";
      if (follower=="on") {
        updateQuery = "UPDATE contact SET status = 'selected' where id="+id;
      } else {
        updateQuery = "UPDATE contact SET status = 'cant_be_selected' where id="+id;
      }
      
      console.warn(updateQuery);
      $cordovaSQLite.execute(db, updateQuery).then(function(result){
        return callBack();
      });
      
    };
    /**
     * 
     */
    var updateContactLastSendAndLanguageRdv = function(db,id,language,rdvTimeStamp, callBack){
    	var updateQuery ="UPDATE contact SET lastsendemail='"+toUsFormat(new Date())+"', LanguageText='"+language +"' ,rendez_vous='"+rdvTimeStamp+"' where id ="+id;
    	
    	
    	console.warn(updateQuery);
    	$cordovaSQLite.execute(db, updateQuery).then(function(result){
    		var query = "SELECT * FROM contact WHERE id ="+id;
    		$cordovaSQLite.execute(db, query).then(function(contact){
    		return callBack(contact);
    	});
    	});
    	
    };
    
  /**
   * get Contact from server by email 
   */
  var getContactFromServerByEmail = function(email,callBack,errorCallBack){
    // the request parameters
    var request = {
      method: 'POST',
      url: 'http://buzcard.fr/contacts_mobile.aspx?request=contacts',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: function(obj) {
        var str = [];
        for ( var p in obj)
          str.push(encodeURIComponent(p) + "="+ encodeURIComponent(obj[p]));
        return str.join("&");
      },
      transformResponse: function(data) {
        var x2js = new X2JS();
        var json = x2js.xml_str2json(data);
        return json;
      },
      data: {
        search:email,
        list:"",
        sorting_criterion:"date",
        sorting_order:"desc",
        page:1,
      },
    };
    $http(request).success(function(data, status, headers, config) {
    	if(data.contacts.contact instanceof Array){
    		console.log("array");
    		for (var int = 0; int < data.contacts.contact.length; int++) {
				if(data.contacts.contact[int].email==email)
					 return callBack(data.contacts.contact[int]);
			}
    	}
    		
    	if (data.contacts.contact instanceof Object){
    		console.log("object");
    		return callBack(data.contacts.contact);
    	} 
    	
     
    });
  };
  /**
   * return the weekend in timeStamp format
   */
  function weekEnd() {
    var today = new Date().getDate();
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();
    var now = parseInt((new Date(month+"/"+today+"/"+year).getTime()-Date.UTC(1970,0,1))/1000);
    var diff = 6 - new Date().getDay();
    return now + 86400 *diff;
  };
  
  /**
   * return the now timeStamp 
   */
  function nowInTimeStamp() {
    var today = new Date().getDate();
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();
    var now = parseInt((new Date(month+"/"+today+"/"+year).getTime()-Date.UTC(1970,0,1))/1000);
    return now;
  };
  

	/**
	 * convert date to timeStamp
	 */
	function toTimeStamp(date) {
		try {
			var x= new Date(date).getTime()/1000;
			return x;
		} catch (e) {
			console.log(e);
			var x= new Date().getTime()/1000;
			return x; 
		}  
	};


  var uploadPhotoContact = function (path, idContact, callBack, errorCallBack) {
      var isWindowsPhone = ionic.Platform.isWindowsPhone();
    
          var fileName = path.substr(path.lastIndexOf('/') + 1);
          var pathFile = path.substr(0, path.lastIndexOf('/') + 1);
          $cordovaFile.readAsArrayBuffer(pathFile, fileName).then(function (success) {
              // success

              var fd = new FormData();
              var image = new Uint8Array(success);
              fd.append('photo', new Blob([image], {
                  type: 'image/jpeg'
              }), fileName);

              $http.post("http://buzcard.fr/contacts.aspx?request=update_photo&type=portrait&contact_id=" + idContact, fd, {
                  transformRequest: angular.identity,
                  headers: {
                      'Content-Type': undefined
                  }
              })
                  .success(function (data, status, headers, config) {
                      console.log('success upload ...');
                      callBack();

                  })
                  .error(function () {
                      console.log('erreur');
                      errorCallBack();
                  });


          }, function (error) {
              // error
              errorCallBack();
          });
     
	};

	/**
	 * insert or update contact
	 */  
	var insertOrUpdateContacts = function(db, i, total, contacts, callBack) {

		//appel recurssive
	    if (i < parseInt(total)) {
	        
	        //ca ou il y a plusieurs contacts
	        if (contacts instanceof Array) {
	            getContactbyId(db, contacts[i].id, function(result) {
	                
	                if (result.rows.length > 0) {
	                    console.info("update");
	                    //update 
	                    updateContactInfoDateModification(db, contacts[i], function() {
	                    	//test si le nouveau contact a un nouveau groupe
	                    	selectContactByGroupName(db,contacts[i].list,function(groupResult){
	                    		if (groupResult.rows.length > 0) {
	                    			insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    		}else{
	                    			insertIntoGroupTable (db,contacts[i].list,function(){
	                    				insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    			});
	                    			
	                    		}
	                    	});
	                        
	                    });
	                } else {
	                    console.info("insert");
	                    //insert
	                    insertIntoContactsTable(db, contacts[i], function() {
	                    	//test si le nouveau contact a un nouveau groupe
	                    	selectContactByGroupName(db,contacts[i].list,function(groupResult){
	                    		if (groupResult.rows.length > 0) {
	                    			insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    		}else{
	                    			insertIntoGroupTable (db,contacts[i].list,function(){
	                    				insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    			});
	                    			
	                    		}
	                    	});
	                    });
	                }
	            });
	        //ca ou il y a un seul contact
	        } else {
	            getContactbyId(db, contacts.id, function(result) {
	                if (result.rows.length > 0) {
	                    console.info("update");
	                    //update
	                    updateContactInfoDateModification(db, contacts, function() {
	                    	//test si le nouveau contact a un nouveau groupe
	                    	selectContactByGroupName(db,contacts.list,function(groupResult){
	                    		if (groupResult.rows.length > 0) {
	                    			insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    		}else{
	                    			insertIntoGroupTable (db,contacts.list,function(){
	                    				insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    			});
	                    			
	                    		}
	                    	});
	                    });
	                } else {
	                    console.info("insert");
	                    //insert
	                    insertIntoContactsTable(db, contacts, function() {
	                    	//test si le nouveau contact a un nouveau groupe
	                    	selectContactByGroupName(db,contacts.list,function(groupResult){
	                    		if (groupResult.rows.length > 0) {
	                    			insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    		}else{
	                    			insertIntoGroupTable (db,contacts.list,function(){
	                    				insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    			});
	                    			
	                    		}
	                    	});
	                        insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    });
	                }
	            });
	        }

	    //appel recurssive
	    } else {
	        return callBack();
	    }
	};
	
	/**
	   * update info contact en local
	   */
	  var updateContactInfoNew = function(db, contact, callBack){
		  
		  try{
			  
		  var updateQuery = " UPDATE contact SET  "+
		          //TODO FIXME est ce que c'est bien un timestamp ?
		  				"rendez_vous ='"+toTimeStamp(contact.rendez_vous)+"'," +
		  				"lastsendemail ='"+contact.lastsendemail+"',"+
		  				"LanguageText ='"+contact.LanguageText+"' "+
		  				"where id="+contact.id+"";
		  console.warn(updateQuery);
		  $cordovaSQLite.execute(db, updateQuery).then(function(results){
		    	
		    	callBack();
	    	  
	      }, function(reason) {
	          console.log(reason);
	          return 1;
	      }, function(value) {
	    	
	       console.log(value);
	       return 1;
	      });
	      
	      return 0;
	    } catch (e) {
	      console.log(e);
	      return 1;
	    }
	  };
	  
	
	    /**
	     * get all id contacts from table contacts
	     */
	   var getAllContactsId = function(db, callBack){
		   try {
			      
			      var query = 'SELECT id FROM contact ';
			      console.warn(query);
			      $cordovaSQLite.execute(db, query).then(function(result) {
			         
			          return callBack(result);
			        }, function(reason) {
			        	//TODO FIXME 
			          console.log("error " + reason);
			          return 1;
			        });
			     
			    } catch (e) {
			      console.log(e);
			      return 1;
			    }   
	   }; 
	   
	   /**
	    * get Ids of contacts who has images 
	    */
	   var getAllContactsIdWhoHasPhoto = function(db, callBack){
		   try {
			      
			      var query = 'SELECT id FROM contact where photofilelocation !="" ';
			      console.warn(query);
			      $cordovaSQLite.execute(db, query).then(function(result) {
			         
			          return callBack(result);
			        }, function(reason) {
			        	//TODO FIXME 
			          console.log("error " + reason);
			          return 1;
			        });
			     
			    } catch (e) {
			      console.log(e);
			      return 1;
			    }   
	   }; 
	   
	   /**
	    * update contact photo
	    */
	   var updateContactPhoto = function(db, contactId,photoFileLocation, callBack){
		   try {
			   
			   var query = 'update contact set photofilelocation ="'+photoFileLocation+'" where id='+contactId;
			   console.warn(query);
			   $cordovaSQLite.execute(db, query).then(function(result) {
				   
				   return callBack(result);
			   }, function(reason) {
				   //TODO FIXME 
				   console.log("error " + reason);
				   return 1;
			   });
			   
		   } catch (e) {
			   console.log(e);
			   return 1;
		   }   
	   }; 
	   
	   /**
	    * set default image for contacts who havn't image
	    */
	   var setDefaultImage = function(db, callBack){
		   try {
			   
			   var query = 'update contact set photofilelocation ="img/photo_top_title.jpg" where id IN(select id from contact where photofilelocation="")';
			   console.warn(query);
			   $cordovaSQLite.execute(db, query).then(function(result) {
				   
				   return callBack(result);
			   }, function(reason) {
				   //TODO FIXME 
				   console.log("error " + reason);
				   return 1;
			   });
			   
		   } catch (e) {
			   console.log(e);
			   return 1;
		   }   
	   }; 
	   
	   var downloadSinglePhotoContact = function(id, i, callBack){
		 
		   var idProfil = $rootScope.idProfil;
	          var isWindowsPhone = ionic.Platform.isWindowsPhone();
	        
	          if (window.cordova) {
	              var path = "";
	              if (/Android|BlackBerry Mini/i.test(navigator.userAgent)) {
	                  path = cordova.file.externalRootDirectory;
	              }else if (isWindowsPhone) {
	             path = "/";
	              } else {
	                  path = cordova.file.documentsDirectory;
	              }
	           var   PathFile = path;
//	              cameraService.checkExistFile('dir'+idProfil, id + '.jpg', function (url) {
//	                  //file does not exist 
//	            	console.log('checkExistFile.... '+url);
//	                  if (url == "img/photo_top_title.jpg") {
//	                	  console.log("flag 00 if......");
//	                      cameraService.createPath('dir'+idProfil, function (PathFile) {
	                          var fileLocation = $rootScope.fileLocaltion;
	                          var url = "http://buzcard.fr/" + fileLocation + "contacts/" + id + "/imgThumbnail.jpg";
	                          console.log("PathFile........... "+PathFile);
	                          cameraService.downloadFile(PathFile, id + '.jpg', url, function (urlImage) {
	                        	  if(urlImage == "img/photo_top_title.jpg"){
	                        		  console.log("flag 11......");
	                        		  callBack(urlImage,i);  
	                        	  }else{
	                        		  console.log("flag 22......");
	                        		  if(isWindowsPhone){
	                        			  callBack(urlImage,i);
	                        		  }else{
	                        			  callBack(urlImage+ '?' + new Date().getTime() ,i);  
	                        		  }
	                        		  
	                        	  }
	                             
	                          });
//	                      });
//
//	                  } else {
//	                	  console.log("flag x...... "+url);
//	                      // file exist
//	                	  if(isWindowsPhone){
//                			  callBack(url,i);
//                		  }else{
//                			  callBack(url+ '?' + new Date().getTime() ,i);  
//                		  }
//	                  }
//	              });
	          }else{
	        		
	      		  return callBack("undeff",i);    
	         
	          }
	   };
	   
	   /**
	    * download images for contacts who have photo
	    * we use it just at the syncho controller
	    * after the login process  
	    */
	   var downloadAllPhotoContacts = function(db, callBack){
		   var contactArray =[];
		   LoadingService.loadingWithPourcentage("Téléchargement des photos ");
		   $rootScope.pourcentage = "0%";
		   getAllContactsIdWhoHasPhoto(db, function(result){
			   setDefaultImage(db, function(){
			   for(var int=0; int < result.rows.length; int++){
				   contactArray[int] = result.rows.item(int).id;
			   }
			   console.log(JSON.stringify(contactArray));
			   console.log(contactArray.length);
			   recurssiveImg(db,0, contactArray,function(){
				   
				   return callBack();
			   });
		    });
		   });//
	   };
	   /**
	    * download images for contacts who have photo
	    * we use it just at the syncho process in menu contoller
	    * when we click on synchronisation btn on Menu 
	    */
	   var downloadPhotoContactsAtSynchro = function(db,contacts, callBack){
		   if (contacts instanceof Array){
			   console.info("contacts instanceof Array");
			   console.error(JSON.stringify(contacts));
			   recurssiveImgForSynchro(db,0, contacts,function(){
				   
				   return callBack();
			   });
           }
           else if (contacts instanceof Object){
        	   console.info("contacts instanceof Object");
        	   console.error(JSON.stringify(contacts));
        	   downloadAndOverride(contacts.id,function(urlImg){
					updateContactPhoto(db, contacts.id, urlImg,function(){
						 return callBack();
					});
			   });
           }
			   
	   };
	  	
	   /**
	    * recurssive call to download image for the given contact array
	    * @param contactArray : array containing contacts ids
	    * 
	    */
	   function recurssiveImg(db,counter, contactArray,callBack){
		   $rootScope.pourcentage =  parseInt(100 *(counter/contactArray.length)) + "%";
		   if( counter < contactArray.length){
			   downloadSinglePhotoContact(contactArray[counter],counter,function(urlImg,i){
					updateContactPhoto(db, contactArray[counter], urlImg,function(){
						recurssiveImg(db,++counter,contactArray,callBack);
					});
			   });
		   }else{
			   return callBack();
		   }
	   };
	   
	   /**
	    * recurssive call to download image for the given contact array
	    * @param contactArray : array containing contacts
	    * this method is used when we click on synchro btn
	    */
	   function recurssiveImgForSynchro(db,counter, contactArray,callBack){
		   if( counter < contactArray.length){
			   console.info(contactArray[counter]);
			   downloadAndOverride(contactArray[counter].id,function(urlImg,i){
				   updateContactPhoto(db, contactArray[counter].id, urlImg,function(){
					   recurssiveImgForSynchro(db,++counter,contactArray,callBack);
				   });
			   });
		   }else{
			   return callBack();
		   }
	   };
	   
	   
	    /**
	     * convert us time format to french format 
	     */
	    var USToFrenchFromat= function(dateUS){
	    	try {
				
	    		var array1 = dateUS.split("/");
		        var array2 = array1[2].split(" ");
		        var array3 = array2[1].split(":");
		        if (array1[1].length ==1 )
		        	array1[1] = "0"+array1[1];
		        if (array1[0].length ==1 )
		        	array1[0] = "0"+array1[0];
		        if (array3[0].length ==1 )
		        	array3[0] = "0"+array3[0];
		        return array1[1] +"/"+ array1[0] +"/"+array2[0]+" à "+array3[0]+":"+array3[1];
		        
			} catch (e) {
				return dateUS;
			}
	    	
	    }
	    
	    /**
	     * timeStamp : premier date en timestamp en seconde
	     * dateUS : date in us format
	     */
	    var compareDate= function(timeStamp, dateUS){
	    	try {
	    	    if (dateUS == "" || dateUS == null) {
	    	        return 1;
	    	    } else {
	    	        var dx = new Date(timeStamp * 1000);
	    	        var d = new Date(dx.getFullYear(), dx.getMonth(), dx.getDate(), dx.getHours());
	    	        var array1 = dateUS.split("/");
	    	        console.log(d);
	    	        var array2 = array1[2].split(" ");
	    	        var array3 = array2[1].split(":");
	    	        var dd = new Date(array2[0], array1[0] - 1, array1[1], array3[0]);
	    	        dd.setHours((dd.getHours() + 1));
	    	        console.warn(dd);

	    	        if (d.getTime() == dd.getTime()) {
	    	            console.log("the same");
	    	            return 0;
	    	        } else if (d.getTime() < dd.getTime()) {
	    	            console.log("the second");
	    	            return 2;
	    	        } else {
	    	            console.log("the first");
	    	            return 1;
	    	        }

	    	    }

	    	} catch (e) {
	    	    console.log(e);
	    	    return 1;
	    	}    	
	    };

	    /**
	     * download and override contact image
	     */
	    var downloadAndOverride = function(id, callBack){
	    	var idProfil = $rootScope.idProfil;
	    	
	          var isWindowsPhone = ionic.Platform.isWindowsPhone();
	        
	        	//c'est pas windows  
	          if (window.cordova) {
	              var path = "";
	              if (/Android|BlackBerry Mini/i.test(navigator.userAgent)) {
	                  path = cordova.file.externalRootDirectory;
	              } else if (isWindowsPhone) {
	            	  path = "/";
	              }else {
	                  path = cordova.file.documentsDirectory;
	              }
	              var PathFile = path;
	              
	              //créer la repertoire et le fichier
	            //  cameraService.createPath('dir'+idProfil, function (PathFile) {
                      var fileLocation = $rootScope.fileLocaltion;
                      var url = "http://buzcard.fr/" + fileLocation + "contacts/" + id + "/imgThumbnail.jpg";
                      console.log("$$$ fileLocation : "+fileLocation);
                      console.log("&$&$ url : "+url);
                      //telecharger le fichier 
                      cameraService.downloadFile(PathFile, id + '.jpg', url, function (urlImage) {
                    	  if(urlImage == "img/photo_top_title.jpg"){
                    		  console.log("urlImage  if:  "+urlImage);
                    		  return callBack(urlImage);  
                    	  }
                    	  else{
                    		  console.log("urlImage  else:  "+urlImage);
                    		  if(isWindowsPhone){
                    		 return callBack(urlImage);
                    		  }else{
                    			  return callBack(urlImage+ '?' + new Date().getTime() );	  
                    		  }
                    	  }
                         
                      });
              //    });
	          }else{
	        		
	      		  return callBack("undeff");    
	          }
	      
	    };
	    
	    /**
	     * insert many groups in one request
	     */
	    var insertBulkGroupe = function(db,groupeArray,callBack){

	        console.log(groupeArray );
	        var insertQuery = "INSERT INTO groupe SELECT '1' AS 'id', '"+ groupeArray[0] + "' AS 'name'";

	        
	        for (counter=1 ;counter< groupeArray.length; counter++) {
	          insertQuery = insertQuery +"  UNION SELECT '" + parseInt(counter+1) + "','"+ groupeArray[counter] + "'";
	        }
	      
	        try {
				   
				   console.warn(insertQuery);
				   $cordovaSQLite.execute(db, insertQuery).then(function(result) {
					   
					   return callBack();
				   }, function(reason) {
					   //TODO FIXME 
					   console.log( reason);
					   return 1;
				   });
				   
			   } catch (e) {
				   console.log(e);
				   return 1;
			   } 

	    };
	    
	    /**
	     * 
	     */
	    var updateContactModificationDate = function(db,id,modificationDate, callBack){
	        var updateQuery = "UPDATE contact SET modificationdate = '"+modificationDate+"' where id="+id;
	      
	      console.warn(updateQuery);
	      $cordovaSQLite.execute(db, updateQuery).then(function(result){
	        return callBack();
	      }, function (err) {
	        console.error(err);
	      });
	      
	    };
	    
	    /**
	     * @param localContactDate : last synchro date
	     * @param contactLastModified : contact last modified date
	     * 
	     * @return true if contactLastModified < localContactDate
	     *		   false if contactLastModified > localContactDate
	     */
	    var isUpToDate = function(localContactDate, contactLastModified){
	    	if(localContactDate=="" || contactLastModified==""){
	    		return true;
	    	}else{
	    		localDate = new Date(frenchToUsFormat(localContactDate)).getTime();
		    	contactDate = new Date(frenchToUsFormat(contactLastModified)).getTime();
		    	if(localDate >= contactDate  ){
		    		console.log("localDate >= contactDate "+localDate+" || "+ contactDate);
		    		return true;
		    	}else{
		    		console.log("localDate < contactDate "+localDate+" || "+ contactDate);
		    		return false;
		    	}
	    	}
	    	
	    };
  /**
   * the factory returns
   */
  return {
    getContacts: getContacts,
    getContactsEdited: getContactsEdited,
    getGroup : getGroup,
    createGroupTable :createGroupTable,
    createContactsTable : createContactsTable,
    insertIntoGroupTable : insertIntoGroupTable,
    insertIntoContactsTable :insertIntoContactsTable,
    emptyGroupTable  : emptyGroupTable,
    emptyContactTable : emptyContactTable,
    selectContacts : selectContacts,
    getCountOfContact : getCountOfContact,
    getContactbyId:getContactbyId,
    selectFollowers : selectFollowers,
    selectAllGroup : selectAllGroup,
    selectRecontact : selectRecontact,
    updateContactInfo:updateContactInfo,
    deleteContactLocal:deleteContactLocal,
    selectContactsByGroup : selectContactsByGroup,
    getAllContactsByGroup : getAllContactsByGroup,
    searchContact : searchContact,
    insertBulkIntoContactsTable : insertBulkIntoContactsTable,
    downloadPhotoContact: downloadPhotoContact,
    updateContactServer :updateContactServer,
    deleteContactServer : deleteContactServer,
    editGroup : editGroup,
    updateGroupServer : updateGroupServer,
    renameContactGroup : renameContactGroup,
    selectContactByGroupName : selectContactByGroupName,
    deleteGroupByName : deleteGroupByName,
    uploadPhotoContact:uploadPhotoContact,
    getCreditParrainage : getCreditParrainage,
    getContactFromServerByEmail: getContactFromServerByEmail,
    selectContactbyEmail : selectContactbyEmail,
    updateContactStatus : updateContactStatus,
    updateContactIdByEmail : updateContactIdByEmail,
    insertOrUpdateContacts :insertOrUpdateContacts,
    updateContactInfoNew : updateContactInfoNew,
    updateContactInfoDateModification :updateContactInfoDateModification,
    getAllContactsId: getAllContactsId,
    downloadSinglePhotoContact: downloadSinglePhotoContact,
    downloadAllPhotoContacts:downloadAllPhotoContacts,
     compareDate : compareDate,
    USToFrenchFromat :USToFrenchFromat,
    updateContactPhoto :updateContactPhoto,
    downloadPhotoContactsAtSynchro :downloadPhotoContactsAtSynchro,
    downloadAndOverride : downloadAndOverride,
    insertBulkGroupe :insertBulkGroupe,
    isUpToDate : isUpToDate,
    updateContactModificationDate :updateContactModificationDate,
    updateContactLastSendAndLanguageRdv : updateContactLastSendAndLanguageRdv,
  };
  
}]);
function frenchToUsFormat(frenchDate) {
	try {
		console.log(frenchDate);
        var array1 = frenchDate.split("/");
        return array1[1]+"/"+array1[0]+"/"+array1[2];
	} catch (e) {
		return frenchDate ;
	}
	
};
function toUsFormat(date) {
    try {
		return date.getMonth()+1 +"/"+date.getDate()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
	} catch (e) {
		return date;
	}
};//TODO FIXME css : cas de contact qui a un nom et pas de prenom
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
        		
        		  $ionicScrollDelegate.scrollTop();
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
                    ContactsService.getCountOfContact(db, "selected", function(result) {
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
                        ContactsService.getCountOfContact(db, "not_selected", function(result) {
                            if (result.rows.length > 0) {
                                var nonFollowersCount = 0;
                                for (var key in result.rows.item(0)) {
                                    nonFollowersCount = result.rows.item(0)[key];
                                }
                                $scope.tabs[0].count = nonFollowersCount + fowllowersCount;
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
         
            
            $ionicScrollDelegate.$getByHandle().scrollTop();
          
        };

        $scope.isGroupShown = function(group) {
        	$ionicScrollDelegate.resize();
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
            console.log(element);
            $ionicScrollDelegate.resize();
            $timeout(function(){
            	$ionicScrollDelegate.$getByHandle(element);
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
	            var selectQuery = "SELECT * FROM contact where status != 'deleted' and list =='"+$scope.groups[i].name+"' order by date DESC LIMIT 10 OFFSET "+parseInt(10*($scope.groups[i].page-1))+";";
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
	              
	                 handle.anchorScroll();
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
	            var selectQuery = "SELECT * FROM contact where status != 'deleted' and list =='"+$scope.groups[i].name+"' order by date DESC LIMIT 10 OFFSET "+parseInt(10*($scope.groups[i].page-1))+";";
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
	              
	                 handle.anchorScroll();
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
                          
                            handle.anchorScroll();
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
                          
                            handle.anchorScroll();
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
                          
                            handle.anchorScroll();
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
                          
                            handle.anchorScroll();
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
            var div = total / 10;
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
]);appContext.controller("ContactShowController", [
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
          tmpContact = result.rows.item(0);
          $scope.contact = result.rows.item(0);
          $scope.contact.last_name = removeSlashes(result.rows.item(0).last_name);
          $scope.contact.first_name = removeSlashes(result.rows.item(0).first_name);
          $scope.contact.company = removeSlashes(result.rows.item(0).company);
          $scope.contact.list = removeSlashes(result.rows.item(0).list);
          $scope.contact.lastsendemail =result.rows.item(0).lastsendemail;
          $scope.photoProfil = result.rows.item(0).photofilelocation;
//          alert("db "+result.rows.item(0).photofilelocation);
          //test sur le premier e dernier buzz
          if(result.rows.item(0).lastsendemail !="")
        	  $scope.showLast = true;
          var idProfil = $rootScope.idProfil;
         // LoadingService.loading("Chargement..."); 
          $scope.tmp=true;
      
//          ContactsService.downloadPhotoContact($scope.contact.id,function(url) {
//                    $scope.photoProfil = url+ '?' + new Date().getTime(); // "img/photo_top_title.jpg";
//                    LoadingService.dismiss();
//                  });
          console.log(JSON.stringify($scope.contact));
          $scope.contact.rendez_vous = new Date(result.rows.item(0).rendez_vous * 1000);
          if (result.rows.item(0).rendez_vous == '1900-01-01'
                  || result.rows.item(0).rendez_vous == '1970-01-01') {

        	  result.rows.item(0).rendez_vous = '';
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
        	/**€€€€€€€
             *  begin synchronisation
             €€€€€€€*/
        		LoadingService.loading("Synchronisation...");
                ConnectionService.isConnected(db, function() {
                	ContactsService.getContactFromServerByEmail(email,function(contact){
                		ContactsService.getContactbyId(db,contact.id,function(result){
                			if(result.rows.length >0){
                				if(ContactsService.isUpToDate(result.rows.item(0).modificationdate,contact.modificationdate )){
                					//le contact est à jour
                					$state.go('app.contactEdit', {id: id });
                				}else{
                					//le contact sera mit à jour
                					console.log(contact);
                            		console.log("++++++++");
                            		ContactsService.updateContactModificationDate(db,id,contact.modificationdate, function(){
                            		ContactsService.updateContactInfo(db,contact,function(){
                            			 // empty group table
                                        ContactsService.emptyGroupTable(db, function() {
                                            // get data from server
                                            ContactsService.getGroup().success(function(data, status, headers, config) {
                                            	ContactsService.downloadAndOverride($stateParams.id,function(urlImage,i){
                                            		ContactsService.updateContactPhoto(db,$stateParams.id,urlImage,function(){
                                            			//rafraichir la page contact list
                                            			console.log("+++++=======++++++++++++++");
                                            			MenuService.setLocalStorage('ReloadContactList',1);
                                            		if (data.lists.list instanceof Array) {
                                                        for (var int = 0; int < data.lists.list.length; int++)
                                                        // insert into group table
                                                            ContactsService.insertIntoGroupTable(db, data.lists.list[int], function() {
                                                            	//go to contact Edit without update
                                                            	LoadingService.dismiss();
                                                    			$state.go('app.contactEdit', {id: $stateParams.id });
                                                            });
                                                        // LoadingService.loading("Chargement des groupes...");
                                                    } else ContactsService.insertIntoGroupTable(db, data.lists.list, function() {
                                                    	//go to contact Edit without update
                                                    	LoadingService.dismiss();
                                            			$state.go('app.contactEdit', {id: $stateParams.id });
                                                    });
                                            	});
                                            	});
                                            }).error(function(data, status, headers, config) {
                                                console.log("error " + status);
                                                // TODO FIXME
                                            });

                                        });
                            		});//========
                				});//========
                				}
                			}else{
                				LoadingService.error("une erreur réseau est survenue","ContactShowController");
                			}
                		});
                		
                	},function(){
                		//go to contact Edit without update
                		LoadingService.dismiss();
                		$state.go('app.contactEdit', {id: id });
                	});
                }, function() {
                	LoadingService.dismiss();
                	//go to contact Edit (there is no connection)
                	$state.go('app.contactEdit', {id: id })
                });
            /**€€€€€€€
             *  end synchronisation
             €€€€€€€*/

        };
        
        $scope.dismiss = function(){
        	LoadingService.dismiss();
        	$state.go('app.contactEdit', {id: id })
        };

    }]);
appContext.controller("LoginController", [
    '$scope',
    '$state',
    'LoginService',
    '$ionicPlatform',
    '$cordovaSQLite',
    'LoadingService',
    '$ionicHistory',
    '$rootScope',
    function($scope, $state, LoginService, $ionicPlatform, $cordovaSQLite, LoadingService,$ionicHistory,$rootScope) {

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
//SSS
//            if($rootScope.decon){
//               	$rootScope.decon = false;
//               	window.location.reload();
//               }
        });

        $scope.email = "kammoun.salem@gmail.com";
        $scope.password = "melas123";
        // check whether the user exist or not
        
        $scope.recreemonmotdepasse = function(email, password) {
					if( /Android|BlackBerry Mini/i.test(navigator.userAgent) ) {
						navigator.app.loadUrl("http://www.buzcard.fr/recovery.aspx?email=", {openExternal:true});
					} else {
						window.open("http://www.buzcard.fr/recovery.aspx?email=", '_system');
					}
        };
        	
        $scope.signIn = function(email, password) {
            if (typeof email === 'undefined' || typeof password === 'undefined' || !validateEmail(email)) {
                LoadingService.error("Veuillez saisir votre login ainsi que votre mot de passe", "LoginController");
            } else {
                LoadingService.loading("Chargement...");

                LoginService.doLogin(email, password)
                    .success(function(response, status, headers, config) {

                        // user exist
                        if (parseInt(response.identification) != 0) {
                        	 window.localStorage.removeItem('dateSynchronisation');
                          $rootScope.email = email;
                          $rootScope.userId = response.identification;
                          $rootScope.password = password;
//                        $ionicHistory.nextViewOptions({disableBack: true});
//                        $ionicHistory.clearCache();
                          LoadingService.dismiss();
                          $state.go("app.synchro");
                        }
                        // user does not exists
                        else {
                            LoadingService.error("Email ou mot de passe invalide, veuillez vérifier vos identifiants", "LoginController");
                        }

                    }).error(function(data, status, headers, config) {
                        LoadingService.error("Une erreur réseau est survenue<br>Veuillez réessayer plus tard", "LoginController");

                    });
            }
        };
        
        // to dismiss the PopUp
        $scope.dismiss = function() {
            LoadingService.dismiss();
        };

        // activate the given email
        $scope.activate = function(email) {
            if (!validateEmail(email)) {
                LoadingService.error("Merci de saisir un email valide", "LoginController");
            } else {
                LoadingService.loading("Chargement...");
                LoginService
                    .activateAccount(email)
                    .success(function(data, status, headers, config) {
                        switch (data.activation) {
                            case "done":
                                LoadingService.success("Votre compte est déjà activé.", "LoginController");
                                break;
                            case "activated_KDO":
                                LoadingService.success("Votre compte Buzcard<br/>est activé, nous vous avons<br/>envoyé un email pour créer votre mot de passe .", "LoginController");
                                break;
//                            case "done":
//                                LoadingService.success("Votre compte Buzcard<br/>est activé, nous vous avons<br/>envoyé un email pour créer votre mot de passe .", "LoginController");
//                                break;
                            default:
                                break;
                        };
                    }).error(function(data, status, headers, config) {
                        LoadingService.error("Une erreur réseau est survenue<br>Veuillez réessayer plus tard", "LoginController");
                    });
            }

        };

        // deconnection
        $scope.deconnexion = function(){
          console.log('deconnexion');
           LoginService.deleteCredentials(db, function(result) {
             if (result.rowsAffected !=0) {
            	$state.go("app.login");
//            	$location.url("/app/login");
            } else {
              LoadingService.error("erreur lors de déconnection","LoginController");
            }
        });
        };
        /*
         * pour faire la transition entre les pages
         */
//        $scope.goTo = function(stateT){
////        	 $ionicHistory.nextViewOptions({
////           	  disableBack: true
////           	});
////       	  $ionicHistory.clearCache();
//       	  $state.go(stateT);
//        }
        
        function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }
    }
]);appContext.factory("LoginService", [
    '$http',
    '$cordovaSQLite',
    function($http, $cordovaSQLite) {

      /**
       * the login server call
       */
      var logout = function() {
        return     $http.get("http://buzcard.fr/identification.aspx?request=leave");
      };
        /**
         * the login server call
         */
        var doLogin = function(email, password) {

            // the request parameters
            var loginRequest = {
                method: 'POST',
                url: 'http://buzcard.fr/identification.aspx?request=identification',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                transformResponse: function(data) {
                    var x2js = new X2JS();
                    var json = x2js.xml_str2json(data);
                    return json;
                },
                timeout: 4000,
                data: {
                    email: email,
                    hash: password
                }
            };
            // the HTTP request
            return $http(loginRequest);
        };

        /**
         * activate account server call
         */
        var activateAccount = function(email) {
            // the activation parameters
            var activateRequest = {
                method: "POST",
                url: 'http://buzcard.fr/identification.aspx?request=activation',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                transformResponse: function(data) {
                    var x2js = new X2JS();
                    var json = x2js.xml_str2json(data);
                    return json;
                },
                timeout: 4000,
                data: {
                    email: email
                }
            };
            // the HTTP request
            return $http(activateRequest);
        };


        /**
         * create identifiant table
         */
        var createIdentifiantTable = function(db, callBack) {

            var CreateQuery = 'CREATE TABLE IF NOT EXISTS identifiant (' +
                'id INTEGER PRIMARY KEY, ' +
                'email text, password text,userId text)';
            $cordovaSQLite.execute(db, CreateQuery).then(
                function(value) {
                    return callBack();
                },
                function(reason) {
                    console.log(reason);
                },
                function(value) {

                });
        };
        /**
         * delete all records from identifiant table
         */
        var emptyIdentifiantTable = function(db, callBack) {

            var query = "DELETE FROM identifiant where id = 1";
            $cordovaSQLite.execute(db, query).then(function(value) {
                return callBack();
            }, function(reason) {
                console.log(reason);
            }, function(value) {

            });
        };

        /**
         * save the user credentials into the identifiant Table
         */
        var setCredentials = function(db, email, password,userId, callBack) {
            try {
                $cordovaSQLite.execute(db, " INSERT INTO identifiant (id, email, password,userId) VALUES (?,?,?,?) ", [1, email, password,userId]).then(function(value) {
                    return callBack();

                }, function(reason) {
                    console.log(reason);
                }, function(value) {

                });

                return 0;
            } catch (e) {
                console.log(e);
                return 1;
            }
        };

        /**
         * GET the user credentials into the USER Table
         */
        var selectCredentials = function(db, callBack) {
            try {
                $cordovaSQLite.execute(db, "SELECT name FROM sqlite_master WHERE type='table' AND name='identifiant';").then(function(results) {
                    if (results.rows.length > 0) {
                        $cordovaSQLite.execute(db, "SELECT * FROM identifiant WHERE id=1").then(function(res) {

                            return callBack(res);
                        }, function(reason) {
                            console.error(reason);
                            return 1;
                        });
                    } else {
              console.log('table nexiste pas');
               callBack(1);
                    }
                }, function(reason) {
                    console.error(reason);
                    return 1;
                });
            } catch (e) {
                console.log(e);
                return 1;
            }
        };
        var deleteCredentials = function(db, callBack) {

            try {
                $cordovaSQLite.execute(db, "DELETE FROM identifiant WHERE id=1").then(function(result) {
                	$cordovaSQLite.execute(db, "DELETE FROM request").then(function(rs) {
                        return callBack(result);
                    }, function(reason) {
                        console.error(reason);
                        return 1;
                    });
                    
                }, function(reason) {
                    console.error(reason);
                    return 1;
                });

            } catch (e) {
                console.log(e);
                return 1;
            }
        };

        /**
         * the factory returns
         */
        return {
            doLogin: doLogin,
            activateAccount: activateAccount,
            emptyIdentifiantTable: emptyIdentifiantTable,
            setCredentials: setCredentials,
            selectCredentials: selectCredentials,
            createIdentifiantTable: createIdentifiantTable,
            deleteCredentials: deleteCredentials,
            logout: logout
        };

    }
]);appContext.controller("MenuController", ['$timeout', '$ionicViewSwitcher','$cordovaStatusbar','$ionicSideMenuDelegate','$scope', '$state', '$ionicHistory', 'LoginService', 'LoadingService', 'MenuService', '$rootScope', '$cordovaSQLite', '$ionicPlatform', 'ConnectionService', 'BuzcardService', 'ContactsService', 'LoadingService','$compile',
    function($timeout,$ionicViewSwitcher,$cordovaStatusbar,$ionicSideMenuDelegate,$scope, $state, $ionicHistory, LoginService, LoadingService, MenuService, $rootScope, $cordovaSQLite, $ionicPlatform, ConnectionService, BuzcardService, ContactsService, LoadingService,$compile) {
	$rootScope.isCusto = false;
	$rootScope.imgCusto ="img/buzcard-online.png";
	var db = null;
    
    
        $ionicPlatform.ready(function() {
//        	$cordovaStatusbar.hide();
        	if(window.cordova)
    			$cordovaStatusbar.overlaysWebView(false);
        	
        	
        	
//        	$rootScope.data = {canDrag: false};
            /**
             * create/open DB
             */
            if (window.cordova) {
                db = $cordovaSQLite.openDB("buzcard.db"); // device
            } else {
                db = window.openDatabase("buzcard.db", '1', 'my', 1024 * 1024 * 10); // browser
            }
            
            MenuService.setLocalStorage("currentMode", "ONLINE");
            if(MenuService.getLocalStorage("ArrPhoto"))
            $rootScope.ArrPhoto =  MenuService.getLocalStorage("ArrPhoto");
            $scope.currentMode = "ONLINE";
            $scope.switchToMode = "Mode OFF-line";
            
        });

        //pour faire la transition entre les pages
        $scope.goTo = function(stateT) {
        var Pages = {
        	"app.loading" : 1 , 
        	"app.login" : 2 ,
        	"app.synchro" : 3 ,
        	"app.buzcard" : 4 ,
        	"app.buzcardEdit" : 4 ,
        	"app.buzcardSend" : 4 ,
        	"app.contactList" : 5 ,
        	"app.contactEdit" : 5 ,
        	"app.contactShow" : 5 ,
        	"app.qrcode" : 6 ,
        	"app.commandes" : 7
//        	app.creditParrainage
        };
        to = Pages[stateT] ;
        from = Pages[$ionicHistory.currentStateName()] ;
//        alert( to + " > " + from );
        if( to > from )
        	$ionicViewSwitcher.nextDirection("forward");
        else
        	$ionicViewSwitcher.nextDirection("back");
/*
		forward
		back
		enter
		exit
		swap
 */
            $state.go(stateT);
        };
        $scope.creditdeparrainage = function() {
//            $location.url("/app/creditParrainage");
            $state.go("app.creditParrainage");
        };
        //deconnection
        $scope.deconnexion = function() {
            console.log('deconnexion');
            LoginService.deleteCredentials(db, function(result) {
                if (result.rowsAffected != 0) {
//                    $ionicHistory.nextViewOptions({
//                        disableBack: true
//                    });
//                	$rootScope.reload();
                	$timeout(function () {
                        $ionicHistory.clearCache();
                        $ionicHistory.clearHistory();
                    }, 1500)
                    $ionicHistory.clearCache();
                    window.localStorage.clear();
                    $rootScope.isCusto = false;
                    $rootScope.decon = true;
//                    $location.url("/app/login");
//                	location.reload();
                    $state.go("app.login", {}, { reload: true });
                } else {
                    LoadingService.error("erreur lors de déconnection", "MenuController");
                }
            });
        };

        $scope.toggleMode = function(currentMode) {
            if (currentMode == "ONLINE") {
                MenuService.setLocalStorage("currentMode", "OFFLINE");
                $scope.switchToMode = "Mode ON-line";
                $scope.currentMode = "OFFLINE";
                console.info($scope.currentMode);
                //effacer le cache lors de changement du mode (ONLINE/OFFLINE)
//                $ionicHistory.clearCache();
            } else {
                MenuService.setLocalStorage("currentMode", "ONLINE");
                $scope.switchToMode = "Mode OFF-line";
                $scope.currentMode = "ONLINE";
                console.log($scope.currentMode);
                //effacer le cache lors de changement du mode (ONLINE/OFFLINE)
//                $ionicHistory.clearCache();
            }
        };

        // to dismiss the PopUp
        $scope.dismiss = function() {
            LoadingService.dismiss();
        };

        $scope.synchronize = function() {
            LoadingService.questionSynchro("Voulez-vous lancer la synchronisation, cela risque de prendre plusieurs minutes ",
                     "UpdateController");
          };



    }

]);appContext.factory("MenuService", [function() {

    /**
     * read from localStorage
     */
    var getLocalStorage = function(index) {
    	
        try {
//        	console.log('getLocalStorage ');
            if (window.localStorage[index])
                return JSON.parse(localStorage[index]);
            else
                return false;
        } catch (e) {
            console.log('getLocalStorage Error : ' + e);
            return false;
        }

    };
    /**
     * write to localStorage
     */
    var setLocalStorage = function(index, value) {
        try {
//        	console.log(index);
//        	console.log(value);
//        	console.log("setLocalStorage");
            localStorage[index] = JSON.stringify(value);
            if (localStorage[index] == JSON.stringify(value))
                return true;
            else
                return false;
        } catch (e) {
            console.log('setLocalStorage Error : ' + e);
            return false;
        }
    };
    
    /**
     * generate now date mm/dd/yyyy hh:mm
     */
    var getDateUS = function() {
    	
    	var localtime = new Date();
    	var serverTimeZone = 107;
    	var hereTimeZone = localtime.getTimezoneOffset(); // -60
    	var offsetTime = new Date(localtime.getTime() + (hereTimeZone + serverTimeZone) *60 * 1000);
        var d = new Date(offsetTime);
        var today = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var hours = d.getHours();
        var minutes = d.getMinutes();

        	
        var now = month + "/" + today + "/" + year + " " + hours + ":" + minutes;
        return now;
    };
    return {
        getLocalStorage: getLocalStorage,
        setLocalStorage: setLocalStorage,
        getDateUS: getDateUS,
    };

}]);appContext.controller('creditParrainageController', [ function() {
	
}]);
   
appContext.controller('QrCodeController', [
              '$state',
              '$scope',
              '$ionicPlatform',
              'LoadingService',
              '$cordovaBarcodeScanner',
              '$ionicHistory',
              function($state,$scope,$ionicPlatform,LoadingService,$cordovaBarcodeScanner,$ionicHistory) {
            	  
  /**
   * scanner un code QR
   */
//            	  $ionicHistory.clearHistory();
	$ionicPlatform.ready(function() {
		
		if( /Android|BlackBerry Mini/i.test(navigator.userAgent) ){ 
			$scope.txtqrcode = "Pour scanner un QR code, approchez simplement votre smartphone de celui-ci afin que ce code se trouve entièrement dans la zone-cible : le contenu de la page web encodée s’affichera automatiquement.<br/>";
		} else {
			$scope.txtqrcode  = "Pour scanner un QR code, commencez par placer votre Iphone devant le code et cliquez sur le bouton ci-dessous<br/>(Si la page web encodée ne s'affiche pas dans les 2 secondes, annulez et recommencez l'opération)";
		}
		
		var isWindowsPhone = ionic.Platform.isWindowsPhone();
		
		if(isWindowsPhone)
			$scope.txtqrcode = "Pour scanner un QR code, approchez simplement votre smartphone de celui-ci afin que ce code se trouve entièrement dans la zone-cible : le contenu de la page web encodée s’affichera automatiquement.<br/>";

  });

  $scope.scanBarcode = function() {
	  LoadingService.loading("Chargement...");

	  
		  $cordovaBarcodeScanner
	      .scan()
	      .then(function(barcodeData) {
		      	console.log(barcodeData);
		  		if (/Android|BlackBerry Mini/i.test(navigator.userAgent)) {
		  			navigator.app.loadUrl(barcodeData.text, { openExternal: true  });
		  			LoadingService.dismiss();
		  		} else {
		  			  window.open(barcodeData.text, '_system');
		  			LoadingService.dismiss();
		  		}
	      }, function(error) {
	    	  alert("Erreur de scan: " + error);
	    	  LoadingService.dismiss();
	      });


//    cordova.plugins.barcodeScanner.scan(function(result) {
//    	
//    	console.log(result);
//    	console.log(result);
//		
//		if (/Android|BlackBerry Mini/i.test(navigator.userAgent)) {
//			navigator.app.loadUrl(result.text, {
//				openExternal: true
//		    });
//			$ionicLoading.hide();
//		} else {
//			  window.open(result.text, '_system');
//			  $ionicLoading.hide();
//		}
//		
//    }, function(error) {
//    	alert("Erreur de scan: " + error);
//    	$ionicLoading.hide();
//	});
  };
}]);appContext.controller("LoadingController", [
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
]);appContext.controller("SynchroController", [
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
        	
            LoadingService.loading("Chargement de la fiche buzcard...");

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

                                                if (data.lists.list instanceof Array) {
                                                    // insert into group table
                                                        ContactsService.insertBulkGroupe(db, data.lists.list, function() {});
                                                } else ContactsService.insertIntoGroupTable(db, data.lists.list, function() {});
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
                var pages = data.contacts.pages;
                if (page < pages - 1) {
                    page = parseInt(page) + 1;


                    ContactsService.insertBulkIntoContactsTable(db, 0, data.contacts.contact, function() {
                        LoadingService.loading("Chargement des contacts : " + parseInt((page / pages) * 100) + "%");
                    });

                    getContactsRecurssive(page, callBack);
                } else {
                    ContactsService.insertBulkIntoContactsTable(db, 0, data.contacts.contact, function() {
                        callBack();

                    });
                }
            }).error(function(data, status, headers, config) {
                console.log("error " + status);
                // TODO FIXME
            });
        }

    }
]);appContext.factory("SynchroServices", [
    '$cordovaSQLite',
    function($cordovaSQLite) {

      /**
       * create request table
       */
      var createRequestTable = function(db, callBack) {
        var createQuery = 'CREATE TABLE IF NOT EXISTS request ('
                + 'id INTEGER PRIMARY KEY, ' + 'name text,object text)';
        console.warn(createQuery);
        try {
          $cordovaSQLite.execute(db, createQuery).then(function(value) {
            return callBack();
          }, function(reason) {
            console.log(reason);
          }, function(value) {

          });
          return 0;
        } catch (e) {
          console.log(e);
          return 1;
        }
      };
      
      /**
       * insert into request table
       * BUZCARDEDIT   : profile
       * CONTACTEDIT   : id,Contact 
       * CONTACTDELETE : id
       * BUZCARDSEND   : email, selectLang, checkFollower, dateRDV
       * RENAMEGROUP   : oldName, newName
       * BUZCARDPHOTO  : path
       * CONTACTPHOTO  : id, path
       */
      var insertRequest = function(db,name,object,callBack){
        
        var insertQuery = "INSERT INTO request (name,object) VALUES ('"+name+"' ,'"+JSON.stringify(object)+"')";
        try {
          console.warn(insertQuery);
          $cordovaSQLite.execute(db, insertQuery).then(function(value) {
            
            return callBack(value);
          }, function(reason) {
            console.log(reason);
          }, function(value) {
            
          });
          return 0;
        } catch (e) {
          console.log(e);
          return 1;
        }
      };
      
      /**
       * select all request from request table 
       */
      var selectAllRequest = function(db, callBack){
        
        try {
          
          var query = 'SELECT * FROM request';
          console.warn(query);
          $cordovaSQLite.execute(db, query).then(function(result) {
             
              return callBack(result);
            }, function(reason) {
              //TODO FIXME 
              console.log("error " + reason);
              return 1;
            });
         
        } catch (e) {
          console.log(e);
          return 1;
        }
      };
      
      /**
       * remove entry from request table
       */
      var deleteRequest = function(db,id,callBack){
        
        var query = "DELETE FROM request where id ="+id;
        console.warn(query);
        $cordovaSQLite.execute(db, query).then(function(value) {
            return callBack();
        }, function(reason) {
            console.log(reason);
        }, function(value) {

        });
      };
      
      return {
        createRequestTable: createRequestTable,
        insertRequest : insertRequest ,
        selectAllRequest : selectAllRequest,
        deleteRequest: deleteRequest,
        
      };
    }]);appContext.controller("UpdateController", ['$scope', '$state', '$rootScope', 'MenuService', 'ConnectionService', 'LoadingService', 'BuzcardService', 'ContactsService', '$ionicPlatform','$ionicHistory','$cordovaSQLite','$location', function($scope, $state, $rootScope, MenuService, ConnectionService, LoadingService, BuzcardService, ContactsService, $ionicPlatform,$ionicHistory,$cordovaSQLite,$location) {


    /**
     * create/open DB
     */
    var db = null;
    $ionicPlatform.ready(function() {


        if (window.cordova) {
            db = $cordovaSQLite.openDB("buzcard.db"); // device
        } else {
            db = window.openDatabase("buzcard.db", '1', 'my', 1024 * 1024 * 10); // browser
        };
    });
    /**
     * click on button Annuler (popup synchronisation)
     */
    $scope.no = function() {
        LoadingService.dismiss();
    };

    /**
     * click on button ok (pop up synchronisation )
     */
    $scope.yes = function() {

        /**€€€€€€€
         *  begin synchronisation
         €€€€€€€*/
        LoadingService.loading("Synchronisation...");
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

                            //LoadingService.loading("Chargement de la photo...");
                            BuzcardService.downloadPhotoProfil(profil.photofilelocation, profil.id, function(url) {
                                //get from server and persist 
                                ContactsService.getContactsEdited().success(function(data, status, headers, config) {
                                    var nbContacts = 0;

                                    if (data.contacts.contact instanceof Array) {
                                        nbContacts = data.contacts.contact.length;
                                        console.log("++++++++" + data.contacts.contact);
                                    } else if (data.contacts.contact instanceof Object) {
                                        nbContacts = 1;
                                        console.log("+++++" + data.contacts.contact);
                                    }
                                    if (nbContacts == 0) {

                                        var dateSynchronisation = MenuService.getDateUS();
                                        MenuService.setLocalStorage("dateSynchronisation", dateSynchronisation);
                                        LoadingService.dismiss();
                                        MenuService.setLocalStorage('ReloadContactList', 1);

//                                        $ionicHistory.nextViewOptions({
//                                            disableBack: true
//                                        });
                                        //$ionicHistory.clearCache();
//                                        $ionicHistory.clearHistory();
                                        console.warn($state.current.name=="app.buzcard");
                                        if($state.current.name=="app.buzcard")
                                        	$state.go($state.current, {}, {reload: true});
                                        else
                                        	$state.go("app.buzcard", {}, {reload: true});

                                    } else {
                                        ContactsService.insertOrUpdateContacts(db, 0, nbContacts, data.contacts.contact, function() {
                                            // empty group table
                                            ContactsService.downloadPhotoContactsAtSynchro(db, data.contacts.contact, function() {
                                                ContactsService.emptyGroupTable(db, function() {
                                                    // get data from server
                                                    ContactsService.getGroup().success(function(data, status, headers, config) {

                                                        if (data.lists.list instanceof Array) {
                                                            // insert into group table
                                                                ContactsService.insertBulkGroupe(db, data.lists.list, function() {
                                                                ContactsService.getCreditParrainage(function(credit) {
                                                                    MenuService.setLocalStorage("credit", credit);
                                                                    var dateSynchronisation = MenuService.getDateUS();
                                                                    MenuService.setLocalStorage("dateSynchronisation", dateSynchronisation);

                                                                    LoadingService.dismiss();
                                                                    MenuService.setLocalStorage('ReloadContactList', 1);
//                                                                    $ionicHistory.nextViewOptions({
//                                                                        disableBack: true
//                                                                    });
//                                                                    $ionicHistory.clearHistory();
                                                                    //rafraichir la page contact list
                                                                    MenuService.setLocalStorage('ReloadContactList', 1);
                                                                    console.warn($state.current.name=="app.buzcard");
                                                                    if($state.current.name=="app.buzcard")
                                                                    	$state.go($state.current, {}, {reload: true});
                                                                    else
                                                                    	$state.go("app.buzcard", {}, {reload: true});
                                                                    //                                                                  });

                                                                });
                                                            });
                                                        } else {
                                                            ContactsService.insertIntoGroupTable(db, data.lists.list, function() {

                                                                ContactsService.getCreditParrainage(function(credit) {
                                                                    MenuService.setLocalStorage("credit", credit);
                                                                    var dateSynchronisation = MenuService.getDateUS();
                                                                    MenuService.setLocalStorage("dateSynchronisation", dateSynchronisation);
                                                                    LoadingService.dismiss();
                                                                    MenuService.setLocalStorage('ReloadContactList', 1);
//                                                                    $ionicHistory.nextViewOptions({
//                                                                        disableBack: true
//                                                                    });
//                                                                    $ionicHistory.clearHistory();
                                                                    MenuService.setLocalStorage('ReloadContactList', 1);
                                                                    if($state.current.name=="app.buzcard")
                                                                    	$state.go($state.current, {}, {reload: true});
                                                                    else
                                                                    	$state.go("app.buzcard", {}, {reload: true});
                                                                });

                                                            });

                                                        }
                                                    }).error(function(data, status, headers, config) {
                                                        console.log("error " + status);
                                                        // TODO FIXME
                                                    });

                                                });



                                            });
                                        });

                                    }

                                }).error(function(data, status, headers, config) {
                                    console.log("error " + status);
                                    // TODO FIXME
                                });

                            });
                        });
                    } else {
                        console.info("data empty");
                        //get from server and persist 
                        ContactsService.getContactsEdited().success(function(data, status, headers, config) {
                            var nbContacts = 0;
                            if (data.contacts.contact instanceof Array) {
                                nbContacts = data.contacts.contact.length;
                                console.log("=========" + data.contacts.contact);
                            } else if (data.contacts.contact instanceof Object) {
                                nbContacts = 1;
                                console.log("======");
                                console.log(data.contacts.contact);
                            }
                            if (nbContacts == 0) {
                                console.log("there is no contacts");
                                var dateSynchronisation = MenuService.getDateUS();
                                MenuService.setLocalStorage("dateSynchronisation", dateSynchronisation);
                                ContactsService.getCreditParrainage(function(credit) {
                                    MenuService.setLocalStorage("credit", credit);
                                    var dateSynchronisation = MenuService.getDateUS();
                                    MenuService.setLocalStorage("dateSynchronisation", dateSynchronisation);
                                    LoadingService.dismiss();
//                                    $ionicHistory.nextViewOptions({
//                                        disableBack: true
//                                    });
                                    //$ionicHistory.clearCache();
                                    $state.go("app.buzcard");
                                });

                            } else {
                                console.log("there is contacts");
                                var contactDataServer = data.contacts.contact;
                                ContactsService.insertOrUpdateContacts(db, 0, nbContacts, contactDataServer, function() {
                                    // empty group table
                                    console.error(JSON.stringify(contactDataServer));
                                    ContactsService.downloadPhotoContactsAtSynchro(db, contactDataServer, function() {
                                        ContactsService.emptyGroupTable(db, function() {
                                            // get data from server
                                            ContactsService.getGroup().success(function(data, status, headers, config) {
                                                console.error("get group d'accord.....");
                                                if (data.lists.list instanceof Array) {
                                                    console.error("group instance of array.....");
                                                    // insert into group table
                                                        ContactsService.insertBulkGroupe(db, data.lists.list, function() {
                                                        ContactsService.getCreditParrainage(function(credit) {
                                                            MenuService.setLocalStorage("credit", credit);
                                                            var dateSynchronisation = MenuService.getDateUS();
                                                            MenuService.setLocalStorage("dateSynchronisation", dateSynchronisation);
                                                            console.log(data);

                                                            LoadingService.dismiss();
//                                                            $ionicHistory.nextViewOptions({
//                                                                disableBack: true
//                                                            });
                                                            //$ionicHistory.clearCache();
//                                                            $ionicHistory.clearHistory();
                                                            //rafraichir la page contact list
                                                            MenuService.setLocalStorage('ReloadContactList', 1);
                                                            $state.go("app.buzcard");
                                                            //                                                        });
                                                        });
                                                    });

                                                } else {
                                                    ContactsService.insertIntoGroupTable(db, data.lists.list, function() {
                                                        ContactsService.getCreditParrainage(function(credit) {
                                                            MenuService.setLocalStorage("credit", credit);
                                                            var dateSynchronisation = MenuService.getDateUS();
                                                            MenuService.setLocalStorage("dateSynchronisation", dateSynchronisation);
                                                            //                                                      ContactsService.downloadPhotoContactsAtSynchro(db,contactDataServer, function(){
                                                            LoadingService.dismiss();
//                                                            $ionicHistory.nextViewOptions({
//                                                                disableBack: true
//                                                            });
                                                            //$ionicHistory.clearCache();
//                                                            $ionicHistory.clearHistory();
                                                            //rafraichir la page contact list
                                                            MenuService.setLocalStorage('ReloadContactList', 1);
                                                            $state.go("app.buzcard");
                                                            //                                                    });
                                                        });
                                                    });
                                                }
                                            }).error(function(data, status, headers, config) {
                                                console.log("error " + status);
                                                // TODO FIXME
                                            });

                                        });

                                    });
                                });
                            }

                        }).error(function(data, status, headers, config) {
                            console.log("error " + status);
                            // TODO FIXME
                        });

                    }
                }).error(function(data, status, headers, config) {
                    console.log("error " + status);
                    // TODO FIXME
                });

            }, function() {
                LoadingService.error("Une erreur réseau est survenue<br>Veuillez réessayer plus tard", "MenuController");
            });

        } else {
            // $state.go("app.buzcard"); 
        }

    }
}]);appContext.directive('datepickerDirective', function(){
	return {
		restrict :'C',
		scope:{
			returnValue:'&getValue'
		},
		link: function(scope, element, attrs){
		//$(element).pickadate(scope.options);
		$(element).pickadate({
			  monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
			  weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
			  today: 'aujourd\'hui',
			  clear: 'effacer',
			  format:'dd/mm/yyyy',
			  formatSubmit: 'dd/mm/yyyy',
			 
			});
//		alert($(element).val());
		}
	}
});