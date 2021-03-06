appContext.directive('datepickerDirective', function(){
	return {
		restrict :'C',
		scope:{
			returnValue:'&getValue'
		},
		link: function(scope, element, attrs){
		//$(element).pickadate(scope.options);
		$(element).pickadate({
			  monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
			  weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
			  today: 'aujourd\'hui',
			  clear: '',
			  format:'dd/mm/yyyy',
			  formatSubmit: 'dd/mm/yyyy',
			 
			});
//		alert($(element).val());
		}
	}
});