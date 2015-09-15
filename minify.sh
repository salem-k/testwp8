
#uglifyjs www/app/buzcard/*.js --compress --mangle
#uglifyjs www/app/commandes/*.js --compress --mangle
#uglifyjs www/app/common/*.js --compress --mangle
##uglifyjs www/app/contacts/*.js --compress --mangle
#uglifyjs www/app/login/*.js --compress --mangle
#uglifyjs www/app/menu/*.js --compress --mangle
#uglifyjs www/app/parrainage/*.js --compress --mangle
#uglifyjs www/app/qrcode/*.js --compress --mangle
#uglifyjs www/app/startup/*.js --compress --mangle
#uglifyjs www/app/synchro/*.js --compress --mangle
#uglifyjs www/app/tests/*.js --compress --mangle


uglifycss --ugly-comments www/css/ionic.app.css www/css/ionicons.css www/css/style.css  > www/css/ionic.app.min.css

uglifyjs www/lib/ionic/js/ionic.bundle.js -o www/lib/ionic/js/ionic.bundle.min.js

uglifyjs www/js/app.js -o www/js/app.min.js

uglifyjs www/lib/ng-cordova.js -o www/lib/ng-cordova.min.js
uglifyjs www/lib/ionic-core.js -o www/lib/ionic-core.min.js


uglifyjs www/app/buzcard/BuzcardController.js -o www/app/buzcard/BuzcardController.min.js
uglifyjs www/app/buzcard/BuzcardServices.js -o  www/app/buzcard/BuzcardServices.min.js
uglifyjs www/app/buzcard/BuzcardEditController.js -o www/app/buzcard/BuzcardEditController.min.js
uglifyjs www/app/buzcard/BuzcardSendController.js -o www/app/buzcard/BuzcardSendController.min.js
uglifyjs www/app/buzcard/test.js -o www/app/buzcard/test.min.js


uglifyjs www/app/commandes/CommandesController.js -o www/app/commandes/CommandesController.min.js
uglifyjs www/app/commandes/CommandesServices.js	-o www/app/commandes/CommandesServices.min.js


uglifyjs www/app/common/ConnectionService.js -o www/app/common/ConnectionService.min.js
uglifyjs www/app/common/LoadingService.js -o www/app/common/LoadingService.min.js

uglifyjs www/app/common/cameraService.js -o www/app/common/cameraService.min.js


uglifyjs www/app/contacts/ContactEditController.js -o www/app/contacts/ContactEditController.min.js
uglifyjs www/app/contacts/ContactsServices.js -o www/app/contacts/ContactsServices.min.js
uglifyjs www/app/contacts/ContactListController.js -o www/app/contacts/ContactListController.min.js
uglifyjs www/app/contacts/ContactShowController.js -o www/app/contacts/ContactShowController.min.js


uglifyjs www/app/login/LoginController.js -o www/app/login/LoginController.min.js
uglifyjs www/app/login/LoginServices.js	-o www/app/login/LoginServices.min.js


uglifyjs www/app/menu/MenuController.js -o www/app/menu/MenuController.min.js
uglifyjs www/app/menu/MenuService.js -o www/app/menu/MenuService.min.js

uglifyjs www/app/parrainage/creditParrainageController.js -o www/app/parrainage/creditParrainageController.min.js


uglifyjs www/app/qrcode/QrCodeController.js -o www/app/qrcode/QrCodeController.min.js
uglifyjs www/app/qrcode/QrCodeServices.js -o www/app/qrcode/QrCodeServices.min.js

uglifyjs www/app/startup/LoadingController.js -o www/app/startup/LoadingController.min.js

uglifyjs www/app/synchro/SynchroController.js -o www/app/synchro/SynchroController.min.js
uglifyjs www/app/synchro/SynchroServices.js -o www/app/synchro/SynchroServices.min.js


uglifyjs www/app/common/UpdateController.js -o www/app/common/UpdateController.min.js

uglifyjs www/app/common/directive.js -o www/app/common/directive.min.js
uglifyjs www/pickerdate/lib/compressed/picker.js -o www/pickerdate/lib/compressed/picker.min.js  
uglifyjs www/pickerdate/lib/compressed/picker.date.js -o www/pickerdate/lib/compressed/picker.date.min.js









#cat www/js/app.js www/app/buzcard/BuzcardController.js www/app/buzcard/BuzcardServices.js www/app/buzcard/BuzcardEditController.js www/app/buzcard/BuzcardSendController.js www/app/buzcard/test.js www/app/commandes/CommandesController.js www/app/commandes/CommandesServices.js www/app/common/ConnectionService.js www/app/common/LoadingService.js www/app/common/cameraService.js www/app/contacts/ContactEditController.js www/app/contacts/ContactsServices.js www/app/contacts/ContactListController.js www/app/contacts/ContactShowController.js www/app/login/LoginController.js www/app/login/LoginServices.js www/app/menu/MenuController.js www/app/menu/MenuService.js www/app/parrainage/creditParrainageController.js www/app/qrcode/QrCodeController.js www/app/qrcode/QrCodeServices.js www/app/startup/LoadingController.js www/app/synchro/SynchroController.js www/app/synchro/SynchroServices.js www/app/common/UpdateController.js www/app/common/directive.js | uglifyjs -o www/app/appliction.min.js

