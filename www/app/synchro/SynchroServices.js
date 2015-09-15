appContext.factory("SynchroServices", [
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
    }]);