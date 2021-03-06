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

//        $scope.email = "kammoun.salem@gmail.com";
//        $scope.password = "melas123";
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
                        LoadingService.error("Connexion insuffisante ou saturée. <br> Merci de réessayer ultérieurement.", "LoginController");

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
                                LoadingService.success("Ce compte a déjà été activé. Vous pouvez y accéder en renseignant ses identifiants ci-dessus.", "LoginController");
                                break;
                            case "activated_KDO":
                                LoadingService.success("Vous avez reçu le lien d'activation par email. Pensez à importer vos fichiers de contacts depuis votre ordinateur, puis revenez sur l'app pour une utilisation optimale.", "LoginController");
                                break;
//                            case "done":
//                                LoadingService.success("Votre compte Buzcard<br/>est activé, nous vous avons<br/>envoyé un email pour créer votre mot de passe .", "LoginController");
//                                break;
                            default:
                                break;
                        };
                    }).error(function(data, status, headers, config) {
                        LoadingService.error("La connexion est insuffisante ou saturée. <br> Veuillez réessayer ultérieurement.", "LoginController");
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
]);