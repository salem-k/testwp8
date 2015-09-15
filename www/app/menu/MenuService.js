appContext.factory("MenuService", [function() {

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

}]);