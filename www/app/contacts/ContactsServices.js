appContext.factory("ContactsService", ['$http','$cordovaSQLite','LoadingService','cameraService','$rootScope','$cordovaFile','LoginService','MenuService', function($http,$cordovaSQLite, LoadingService,cameraService,$rootScope,$cordovaFile,LoginService,MenuService) {
  
	
	
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
    'list TEXT, status text,lastsendemail text,LanguageText text,firstsendemail text, photofilelocation text,alerteemailcreationdate text, modificationdate text)';
    
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
    'list, status,lastsendemail, LanguageText,firstsendemail,photofilelocation,alerteemailcreationdate, modificationdate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
   console.warn(insertQuery);
    try {
      var parameters = [contact.id,toTimeStamp(contact.rendez_vous),contact.email,contact.date,addSlashes(contact.comment),
                        addSlashes(contact.last_name),addSlashes(contact.first_name),contact.phone_1,contact.phone_2,
                        addSlashes(contact.company),addSlashes(contact.list),contact.status,contact.lastsendemail,contact.LanguageText,contact.firstsendemail,contact.photofilelocation,contact.alerteemailcreationdate,contact.modificationdate];
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
  			+ contactArray[j].alerteemailcreationdate + "' AS 'alerteemailcreationdate', '"
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
  				+ contactArray[j].alerteemailcreationdate + "', '"
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
		  "alerteemailcreationdate='"+contact.alerteemailcreationdate+"', "+
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
    var selectQuery = "SELECT * FROM contact WHERE status != 'deleted'  order by date DESC LIMIT 20 OFFSET "+parseInt(20*(page-1));
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
    var selectQuery = "SELECT * FROM contact WHERE status = 'selected'  order by date DESC LIMIT 20 OFFSET "+parseInt(20*(page-1));
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
  var getCountOfContact = function(db,callBack) {
    var selectQuery = "SELECT count (*) FROM contact WHERE status = 'selected' OR status = 'not_selected' ";
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
   * get the all contacts count
   */
  var getCountOfAllContact = function(db,callBack) {
	  var selectQuery = "SELECT count (*) FROM contact WHERE status != 'deleted'";
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
    var selectQuery = "SELECT * FROM contact WHERE ( email LIKE '%"+criteria+"%' OR last_name LIKE '%"+criteria+"%' OR first_name LIKE '%"+criteria+"%' OR comment LIKE '%"+criteria+"%') AND status!='deleted' LIMIT 20  ";
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
    			if( $scope.groups[count] && $scope.groups[count].items.length < 20 ){
    				var tmp= result.rows.item(int);
    				$scope.groups[count].items.push(tmp);
    			}
    		}else{
    			count++;
    			if( $scope.groups[count] && $scope.groups[count].items.length < 20 ){
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
    	if(typeof data.contacts.contact == "undefined")
    		return errorCallBack("NOCONTACT");
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
    	
     
    }).error(function(data, status, headers, config) {
      return errorCallBack(status);
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
	                    	console.log(contacts[i].list);
	                    	if(contacts[i].list==""){
	                    		insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    	}else{
	                    		selectContactByGroupName(db,contacts[i].list,function(groupResult){
		                    		if (groupResult.rows.length > 0) {
		                    			insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
		                    		}else{
		                    			insertIntoGroupTable(db,contacts[i].list,function(){
		                    				insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
		                    			});
		                    			
		                    		}
		                    	});		
	                    	}
	                    
	                        
	                    });
	                } else {
	                    console.info("insert");
	                    //insert
	                    insertIntoContactsTable(db, contacts[i], function() {
	                    	//test si le nouveau contact a un nouveau groupe
	                    	console.log(contacts[i].list);
	                    	if(contacts[i].list==""){
	                    		insertOrUpdateContacts(db, i + 1, total, contacts, callBack);	
	                    	}else{
	                    		selectContactByGroupName(db,contacts[i].list,function(groupResult){
		                    		if (groupResult.rows.length > 0) {
		                    			insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
		                    		}else{
		                    			insertIntoGroupTable (db,contacts[i].list,function(){
		                    				insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
		                    			});
		                    			
		                    		}
		                    	});		
	                    	}
	                    
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
	                    	if(contacts.list==""){
	                    		insertOrUpdateContacts(db, i + 1, total, contacts, callBack);	
	                    	}else{
	                    	selectContactByGroupName(db,contacts.list,function(groupResult){
	                    		if (groupResult.rows.length > 0) {
	                    			insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    		}else{
	                    			insertIntoGroupTable (db,contacts.list,function(){
	                    				insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    			});
	                    			
	                    		}
	                    	});
	                    	}
	                    });
	                } else {
	                    console.info("insert");
	                    //insert
	                    insertIntoContactsTable(db, contacts, function() {
	                    	//test si le nouveau contact a un nouveau groupe
	                    	if(contacts.list==""){
	                    		insertOrUpdateContacts(db, i + 1, total, contacts, callBack);	
	                    	}else{
	                    	selectContactByGroupName(db,contacts.list,function(groupResult){
	                    		if (groupResult.rows.length > 0) {
	                    			insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    		}else{
	                    			insertIntoGroupTable (db,contacts.list,function(){
	                    				insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
	                    			});
	                    			
	                    		}
	                    	});
	                    	}
	                       // insertOrUpdateContacts(db, i + 1, total, contacts, callBack);
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
		   LoadingService.loadingWithPourcentage("Chargement des photos");
		   $rootScope.pourcentage = "0%";
		   getAllContactsIdWhoHasPhoto(db, function(result){
			   setDefaultImage(db, function(){
			   for(var int=0; int < result.rows.length; int++){
				   contactArray[int] = result.rows.item(int).id;
			   }
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
		   if(contactArray.length > 0)
		   $rootScope.pourcentage =  parseInt(100 *(counter/contactArray.length)) + "%";
		   else
			   return callBack();
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
    getCountOfAllContact : getCountOfAllContact,
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
};