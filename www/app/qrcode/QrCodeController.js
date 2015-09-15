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
//	  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	  
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
//		  		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
	      }, function(error) {
//	    	  alert("Erreur de scan: " + error);
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
}]);