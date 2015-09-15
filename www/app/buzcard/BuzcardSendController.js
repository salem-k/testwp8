appContext.controller('BuzcardSendController', ['$cordovaDatePicker','$scope', 'MenuService', 'BuzcardService', 'LoadingService', '$filter', 'ContactsService', '$state', '$ionicPlatform', '$cordovaSQLite', '$ionicHistory', '$rootScope', 'cameraService', 'ConnectionService', 'SynchroServices', function($cordovaDatePicker, $scope, MenuService, BuzcardService, LoadingService, $filter, ContactsService, $state, $ionicPlatform, $cordovaSQLite, $ionicHistory, $rootScope, cameraService, ConnectionService, SynchroServices) {


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
    	 var dateRDVT = new Date(dateRDV.substr(6,4),Number(dateRDV.substr(3,2)) -1,dateRDV.substr(0,2));
    	
    	 MenuService.setLocalStorage('ReloadContactList', 1);
        var checkFollowerValue = '';
        if (checkFollower) {
            checkFollowerValue = 'on';
        } else {
            checkFollowerValue = 'off';
        }
//       alert(dateRDV);
        var dateRDVValue = "";
        if (dateRDVT == '' || dateRDVT == null) {
            dateRDVValue = $filter('date')(new Date(), 'MM/dd/yyyy');
        } else {
            dateRDVValue = $filter('date')(dateRDVT, 'MM/dd/yyyy');
        }
//        alert(dateRDVValue);
        if (typeof email === null || email =='') {
            LoadingService.error("Entrez l'adresse email de votre interlocuteur.", "BuzcardSendController");

        } else if (!validateEmail(email)) {

            LoadingService.error("L\'adresse email saisie est invalide", "BuzcardSendController");
        } else {
        	
        	$rootScope.fromState = "app.buzcardSend";
        	
//            ConnectionService.isConnectedWithoutSync(db, function() {
//            	//************* cas connecté ********************** 
//                LoadingService.loading("Envoi de votre buzcard en cours ");
//
//                if (typeof selectLang === 'undefined' || typeof selectLang === null)
//                    selectLang = "fr";
//                BuzcardService.sendBuzcardToServer(email, selectLang, checkFollowerValue, dateRDVValue, function() {
//                    console.warn("send ok--+++-");
//                    //check if email exist in data base
//                    ContactsService.selectContactbyEmail(db, email, function(result) {
//                        LoadingService.loading('Chargement de la fiche en cours...');
//                        console.warn("select contact from db ok---");
//                        if (result.rows.length == 0) {
//                            //get contact from server
//                            ContactsService.getContactFromServerByEmail(email, function(contact) {
//                                //insert contact into db
//                            	
//                            	contact.photofilelocation ='img/photo_top_title.jpg';
//                            	  console.log(JSON.stringify(contact));
//                            	  
//                                ContactsService.insertIntoContactsTable(db, contact, function() {
//                                    //save photo when get photo from camera buzcard send dans le cas d'un nouveau email
//                                
//                                	if ($scope.photoContact != null) {
//
//                                        var idProfil = $rootScope.idProfil;
//                                        var fileName =  contact.id + '.jpg';
//
//                                        cameraService.RenamePicture(fileName, $scope.photoContact, function(url) {
//                                            ContactsService.updateContactPhoto(db, contact.id, url, function() {
//                                                ContactsService.uploadPhotoContact(url, contact.id, function() {
//                                                    LoadingService.confirm("Votre buzcard a bien été envoyée à <br><font style='font-style: normal;color:#79A436'> " + email + "<br></font>Vous pouvez compléter sa fiche et l\'affecter à un groupe", contact.id, "BuzcardSendController");
//                                                   
//                                                }, function() {
//                                                    console.log('erreur upload photo contact');
//                                                });
//                                            });
//                                        });
//                                    } else {
//                                        LoadingService.confirm("Votre buzcard a bien été envoyée à <br><font style='font-style: normal;color:#79A436'> " + email + "</font><br>Vous pouvez compléter sa fiche et l\'affecter à un groupe", contact.id, "BuzcardSendController");
//                                    }
//
//
//                                });
//
//                            }, function() {
//                                //get contact from server error
//                            });
//                        } else {
//                            console.warn("contact already exist");                          
//                            var dateRdvTimeStamp = parseInt(dateRDVT.getTime() / 1000);
//                            ContactsService.updateContactLastSendAndLanguageRdv(db, result.rows.item(0).id, extractLang(selectLang), dateRdvTimeStamp, function(resX) {
//                                console.log("#### resx ##### " + JSON.stringify(resX.rows.item(0)) + " ######");
//                                ContactsService.updateContactStatus(db, result.rows.item(0).id, checkFollowerValue, function() {
//                                    //save photo camera dans le cas d'un email existant 
//                                    if ($scope.photoContact != null) {
//
//                                        var idProfil = $rootScope.idProfil;
//                                        var fileName =  result.rows.item(0).id + '.jpg';
//
//                                        cameraService.RenamePicture(fileName, $scope.photoContact, function(url) {
//                                            ContactsService.updateContactPhoto(db, result.rows.item(0).id, url, function() {
//                                                ContactsService.uploadPhotoContact(url, result.rows.item(0).id, function() {
//                                                    console.log('uploaded CONTACTPHOTO');
//                                                    LoadingService.confirm("Votre buzcard a bien été envoyée à <br><font style='font-style: normal;color:#79A436'> " + email + "<br></font>Vous pouvez compléter sa fiche et l\'affecter à un groupe", result.rows.item(0).id, "BuzcardSendController");
//
//                                                }, function() {
//                                                    console.log('erreur upload photo contact');
//                                                });
//
//                                            });
//                                        });
//                                    } else {
//                                        LoadingService.confirm("Votre buzcard a bien été envoyée à <br><font style='font-style: normal;color:#79A436'> " + email + "<br></font>Vous pouvez compléter sa fiche et l\'affecter à un groupe", result.rows.item(0).id, "BuzcardSendController");
//
//                                    }
//                                });
//                            });
//                        }
//
//                    });
//
//                }, function(thrownError) {
//                	console.log('erreur send buzcard'+JSON.stringify(thrownError));
//                    LoadingService.error("Connexion insuffisante ou saturée. Merci de cliquer ultérieurement sur \"Synchroniser\" pour que votre buzcard soit bien envoyée.", "BuzcardSendController");
//                });
// Votre buzcard est en cours d’envoi à  <font style='font-style: normal;color:#79A436'> <br>" + email + "</font>.Vous pouvez sans attendre compléter sa fiche (groupe, note, photos…). 
//
//
//            }, function() {
                LoadingService.loading("Votre buzcard est en cours d’envoi à <font style='font-style: normal;color:#79A436'> <br>" + email + "</font>.<br>Vous pouvez sans attendre compléter<br> sa fiche (groupe, note, photos…).");
              //************* cas non connecté ********************** 
			    if(dateRDVValue == $filter('date')(new Date(), 'MM/dd/yyyy') ){
			    	dateRDVValue='';
			    	dateRDV2= $filter('date')(new Date(), 'MM/dd/yyyy');
			    }else{
			    	dateRDVValue = $filter('date')(dateRDVT, 'dd/MM/yyyy');
			    	dateRDV2= $filter('date')(dateRDVT, 'MM/dd/yyyy');
			    }
                var object = {
                    email: email,
                    selectLang: selectLang,
                    checkFollower: checkFollowerValue,
                    dateRDV: dateRDV2
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
                                firstsendemail: $filter('date')(new Date(), 'MM/dd/yyyy HH:mm'),
                                lastsendemail: "",
                                photofilelocation: "img/photo_top_title.jpg",
                                LanguageText: extractLang(selectLang),
                                alerteemailcreationdate: $filter('date')(new Date(), 'MM/dd/yyyy HH:mm:ss'),
                            };
                           
                            console.log("#### do not exist ##### " + JSON.stringify(contactObj) + " ######");
                            ContactsService.insertIntoContactsTable(db, contactObj, function() {
                                if ($scope.photoContact != null) {

                                    var idProfil = $rootScope.idProfil;
                                    var fileName = idTmp + '.jpg';

                                    cameraService.RenamePicture(fileName, $scope.photoContact, function(url) {
                                        ContactsService.updateContactPhoto(db, contactObj.id, url, function() {
                                           // LoadingService.confirm("Votre buzcard sera envoyée à<br><font style='font-style: normal;color:#79A436'>" + email + "<br></font>dès que vous aurez à nouveau du réseau", idTmp, "BuzcardSendController");
                                            LoadingService.confirm("Votre buzcard est en cours d’envoi à <font style='font-style: normal;color:#79A436'> <br>" + email + "</font>.<br>Vous pouvez sans attendre compléter<br> sa fiche (groupe, note, photos…).", idTmp, "BuzcardSendController");
                                            
                                        });
                                    });
                                } else {
                                	  LoadingService.confirm("Votre buzcard est en cours d’envoi à <font style='font-style: normal;color:#79A436'> <br>" + email + "</font>.<br>Vous pouvez sans attendre compléter<br> sa fiche (groupe, note, photos…).", idTmp, "BuzcardSendController");
                                      
                                }
                            });
                        } else {
                            //************* mode offline & contact exist deja ********************** 
                        	 var dateTmp= new Date(dateRDV.substr(6,4),Number(dateRDV.substr(3,2)) -1,dateRDV.substr(0,2));
                        	 if( $filter('date')(new Date(dateTmp), 'MM/dd/yyyy')== $filter('date')(new Date(), 'MM/dd/yyyy')){
                        		 contactX = {
                                         id: result.rows.item(0).id,
                                        // rendez_vous: dateTmp,
                                         lastsendemail: $filter('date')(new Date(), 'MM/dd/yyyy HH:mm'),
                                         LanguageText: extractLang(selectLang)
                                     }; 
                        	 }else{
                        		 
                        		 contactX = {
                                         id: result.rows.item(0).id,
                                          rendez_vous: $filter('date')(new Date(dateTmp), 'MM/dd/yyyy'),
                                         lastsendemail: $filter('date')(new Date(), 'MM/dd/yyyy HH:mm'),
                                         LanguageText: extractLang(selectLang)
                                     };
                        	 }
                        		
                           
                        	 
                            console.log("#### exist ##### " + JSON.stringify(contactX) + " ######");
                            console.log($scope.photoContact);
                            if ($scope.photoContact != null) {
                            	console.log("eeeeeeeee if");
                                var idProfil = $rootScope.idProfil;
                                var fileName =  contactX.id + '.jpg';
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
                                            	  LoadingService.confirm("Votre buzcard est en cours d’envoi à <font style='font-style: normal;color:#79A436'> <br>" + email + "</font>.<br>Vous pouvez sans attendre compléter<br> sa fiche (groupe, note, photos…).", result.rows.item(0).id, "BuzcardSendController");
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
                                      //  LoadingService.confirm("Votre buzcard sera envoyée à<br><font style='font-styles: normal;color:#79A436'>" + email + "<br></font>dès que vous aurez à nouveau du réseau", result.rows.item(0).id, "BuzcardSendController");
                                    	  LoadingService.confirm("Votre buzcard est en cours d’envoi à <font style='font-style: normal;color:#79A436'> <br>" + email + "</font>.<br>Vous pouvez sans attendre compléter<br> sa fiche (groupe, note, photos…).", result.rows.item(0).id, "BuzcardSendController");
                                          
                                    });

                                });
                            }



                        }
                    });
                });
//            });
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
      //  LoadingService.loading("");
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
            LoadingService.success('La photo a bien été enregistrée.','BuzcardSendController');
            ///LoadingService.dismiss();
        }, function(err) {
            console.error(err);
            LoadingService.dismiss();
        });
    };

    
    $scope.keyPressed = function(keyEvent) {
    
   		  if (keyEvent.keyCode == 13 || keyEvent.keyCode == KeyEvent.KEYCODE_BACK) {
       	 
          cordova.plugins.Keyboard.close();
   		  }
   	
    };
    
    function toUsFormat(date) {
        console.warn("initial date : " + date)
        try {
        	if("" != date){
        		var array = date.split("/");
                var dateTmp = array[1] + "/" + array[0] + "/" + array[2];
                console.log("new format : " + dateTmp);
                return dateTmp;
        	}else{
        		return date;
        	}
        	
		} catch (e) {
			return date;
		}
        
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

}]);