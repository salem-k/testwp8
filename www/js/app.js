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
  //$ionicConfigProvider.tabs.position('bottom'); 
  $ionicConfigProvider.views.forwardCache(true);

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
    cache: false, 
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
}).filter('removeSeconds', function() {
	  return function(input) {
		   
		  try{
			var result;  
			result =input.substring(0,input.lastIndexOf(":"));
			return result;
		  }catch(e){
		    return input;
		  }
	  };
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
 
  
  
