appContext.controller("MenuController", ['$timeout', '$ionicViewSwitcher','$cordovaStatusbar','$ionicSideMenuDelegate','$scope', '$state', '$ionicHistory', 'LoginService', 'LoadingService', 'MenuService', '$rootScope', '$cordovaSQLite', '$ionicPlatform', 'ConnectionService', 'BuzcardService', 'ContactsService', 'LoadingService','$compile',
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
                    $scope.password=null;
                   	$scope.email=null;
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
            LoadingService.questionSynchro("Voulez-vous lancer la synchronisation,<br> cela risque de prendre plusieurs minutes ",
                     "UpdateController");
          };



    }

]);