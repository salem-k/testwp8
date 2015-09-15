appContext.factory("LoadingService", ['$ionicLoading', function($ionicLoading) {
  
  var error = function (msg,controller) {
    
    $ionicLoading.show({
      template: '<div class="window error" ng-controller="'+controller+'"><p class="incorrect_informations_text">'+msg+'.</p><button class="ok_text" ng-click="dismiss()">ok</button></div>',
      animation: 'fade-in',
      showBackdrop: true,
    });
    
  };
  
  var errorWithTreatment = function (msg,controller,id) {
	    
	    $ionicLoading.show({
	      template: '<div class="window error" ng-controller="'+controller+'"><p class="incorrect_informations_text">'+msg+'.</p><button class="ok_text" ng-click="treatment('+id+')">ok</button></div>',
	      animation: 'fade-in',
	      showBackdrop: true,
	    });
	    
	  };
	  
  var success = function(msg,controller) {
    
    $ionicLoading.show({
      template: '<div class="window" ng-controller="'+controller+'"><p class="activated_KDO_text">'+msg+'</p><button class="ok_text" ng-click="dismiss()">ok</button></div>',
      animation: 'fade-in',
      showBackdrop: true,
    });
    
  };
  
  var question = function(msg,params, controller) {
	    
	    $ionicLoading.show({
	      template: '<div class="window" ng-controller="'+controller+'"><p class="activated_KDO_text">'+msg+'</p><button class="no_text" ng-click="no()">Non</button><button class="yes_text" ng-click="yes('+params+')">oui</button></div>',
	      animation: 'fade-in',
	      showBackdrop: true,
	    });
	    
	  };
	  
  var loading = function(msg) {
    $ionicLoading.show({
      template: '<p class="item-icon-left" id="lodingText" style="color: #000; background-color: #FFFFFF; margin: auto; padding: 12px 10px 0px 10px; display: block; border-radius: 6px;">'+msg+'<br><img src="img/loading.gif"></p>',
      animation: 'fade-in',
      showBackdrop: true,
    });
  };
  
  var dismiss = function() {
    $ionicLoading.hide();
  };
  
  var confirm = function(msg,params, controller) {
    
    $ionicLoading.show({
      template: '<div class="window" ng-controller="'+controller+'"><p class="activated_KDO_text">'+msg+'</p><button class="yes_text" ng-click="ok('+params+')">OK</button></div>',
      animation: 'fade-in',
      showBackdrop: true,
    });
    
  };
  
  var questionSynchro = function(msg, controller) {
	    
	    $ionicLoading.show({
	      template: '<div class="window" ng-controller="'+controller+'"><p class="activated_KDO_text">'+msg+'</p><button class="no_text" ng-click="no()">Annuler</button><button class="yes_text" ng-click="yes()">Ok</button></div>',
	      animation: 'fade-in',
	      showBackdrop: true,
	    });
	    
	  };
	  
  var loadingWithPourcentage = function(msg){
	  $ionicLoading.show({
	      template: '<p class="item-icon-left" id="lodingText" style="color: #000; background-color: #FFFFFF; margin: auto; padding: 12px 10px 0px 10px; display: block; border-radius: 6px;">'+msg+'&nbsp{{pourcentage}}<br><img src="img/loading.gif"></p>',
	      animation: 'fade-in',
	      showBackdrop: true,
	    });
  } 
  
  return {
    error : error,
    success : success,
    loading : loading,
    dismiss : dismiss,
    question: question,
    confirm : confirm,
    questionSynchro:questionSynchro,
    loadingWithPourcentage :loadingWithPourcentage,
    errorWithTreatment : errorWithTreatment,
  };
}]);