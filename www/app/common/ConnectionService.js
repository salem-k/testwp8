appContext.factory("ConnectionService", ['LoginService', '$http','SynchroServices','BuzcardService','ContactsService','LoadingService','$rootScope','cameraService','MenuService','$timeout', function(LoginService, $http,SynchroServices,BuzcardService,ContactsService,LoadingService,$rootScope,cameraService,MenuService,$timeout ) {


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
            timeout: 2500,
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
                    	console.info("logout success...");
                        LoginService.selectCredentials(db, function(result) {
                            LoginService.doLogin(result.rows.item(0).email,
                                result.rows.item(0).password).success(
                                function(data, status, headers, config) {
                                	console.info("login success...");
                                  execReq(db,function(){
                                    
                                    return connectedCallBack();
                                  });
                                }).error(function(data, status, headers, config) {
                                    // return not connected
                                	console.warn("not connected & error login");
                                	return notConnectedCallBack();
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
    /**
     * test if there is connection
     */
    var isConnectedWithoutSync = function(db, connectedCallBack, notConnectedCallBack) {
    	
    	//forcer le mode offline
//      if (MenuService.getLocalStorage("currentMode")=="ONLINE") {
    	console.info("the mode is : ONLINE");
    	// the request parameters
    	var testRequest = {
    			method: 'GET',
    			url: 'http://buzcard.fr/nepaseffacer.txt',
    			timeout: 850,
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
    						console.info("logout success...");
    						LoginService.selectCredentials(db, function(result) {
    							LoginService.doLogin(result.rows.item(0).email,
    									result.rows.item(0).password).success(
    											function(data, status, headers, config) {
    												console.info("login success...");
    													
    													return connectedCallBack();
    											}).error(function(data, status, headers, config) {
    												// return not connected
    												console.warn("not connected & error login");
    												return notConnectedCallBack();
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
          LoadingService.loading("Synchronisation serveur en cours...");
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
                    console.log("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard \n code : 0x0001 ");
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
                    console.log("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard  \n code : 0x0002");
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
                    console.log("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard  \n code : 0x0003");
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
                    	  cameraService.checkExistFile( localContact.id + '.jpg',function(url) {
                    		if(url != "img/photo_top_title.jpg"){
                    			console.log("$$$$$$ img exist");
                    			var fileName =  remoteContact.id+ '.jpg';

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
                                            console.log("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard  \n code : 0x0004");
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
                	  cameraService.checkExistFile( localContact.id + '.jpg',function(url) {
                		if(url != "img/photo_top_title.jpg"){
                			 console.log("£££££££ img exist");
                			var fileName = remoteContact.id+ '.jpg';

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
                                        console.log("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard  \n code : 0x0005");
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
                	  cameraService.checkExistFile( contactServer.id + '.jpg',function(url) {
                		if(url != "img/photo_top_title.jpg"){
                			 console.log("£££££££ img exist");
                			var fileName =contactServer.id+ '.jpg';

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
                                        console.log("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard  \n code : 0x0006");
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
              console.log("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard  \n code : 0x0007");
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
                    console.log("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard  \n code : 0x0008");
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
                    console.log("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard  \n code : 0x0009");
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
                      console.log("une erreur réseau est survenue lors de la synchronisation \nVeuillez réessayer plus tard  \n code : 0x0010");
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
        isConnectedWithoutSync : isConnectedWithoutSync
    };
}]);