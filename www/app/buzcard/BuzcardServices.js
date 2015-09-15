appContext.factory("BuzcardService", ['$http', '$cordovaSQLite','cameraService','$cordovaFile','MenuService', function($http, $cordovaSQLite, cameraService,$cordovaFile,MenuService ) {
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
                    profil.birthdate , addSlashes(profil.company) , addSlashes(profil.position) , addSlashes(profil.network) ,
                    profil.email , profil.mobile_1 ,profil.mobile_2 ,
                    profil.landline_1 , profil.landline_2 , profil.fax ,
                    addSlashes(profil.address_line_1) , addSlashes(profil.address_line_2) ,
                    addSlashes(profil.address_line_3) , profil.postal_code , profil.facebook ,
                    profil.twitter , profil.flickr ,
                    profil.linkedin , profil.viadeo , profil.website , profil.skype ,
                    profil.xing , profil.myspace ,
                    profil.delicious , profil.rss ,addhttp( profil.link_1) , profil.link_title_1 ,
                    addhttp( profil.link_2) ,
                    profil.link_title_2 , addhttp( profil.link_3) , profil.link_title_3 ,
                    addhttp( profil.link_4) , profil.link_title_4 ,
                    addSlashes(profil.news_1) , addSlashes(profil.news_2) , addSlashes(profil.news_3) , profil.city ,
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
        'company  ="'+addSlashes(profil.company)+'" ,'+
        'position ="'+addSlashes(profil.position)+'" ,'+
        'network ="'+addSlashes(profil.network)+'" ,'+
        'email ="'+profil.email+'" ,'+
        'mobile_1 ="'+profil.mobile_1+'" ,'+
        'mobile_2 ="'+profil.mobile_2+'" ,'+
        'landline_1 ="'+profil.landline_1+'" ,'+
        'landline_2 ="'+profil.landline_2+'" ,'+
        'fax  ="'+profil.fax+'" ,'+
        'address_line_1  ="'+addSlashes(profil.address_line_1)+'" ,'+
        'address_line_2  ="'+addSlashes(profil.address_line_2)+'" ,'+
        'address_line_3  ="'+addSlashes(profil.address_line_3)+'" ,'+
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
        'news_1 ="'+addSlashes(profil.news_1)+'" ,'+
        'news_2 ="'+addSlashes(profil.news_2)+'" ,'+
        'news_3 ="'+addSlashes(profil.news_3)+'" ,'+
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
    		 cameraService.deleteFile('imgThumbnail.jpg',function() {

      
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
             
          });
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
            url : "http://buzcard.fr/Vcard_Send.aspx?"+decodeURIComponent(arg[1]) +"&Click=OK",
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
};