# Release Build (armv7 & arm64)
#
ionic platform remove ios
gulp useref
ionic platform add ios
cp assets/build/ios/build.xcconfig platforms/ios/cordova/build.xcconfig
ionic build ios --device
/usr/bin/codesign --display platforms/ios/build/device/appname.app
Lipo -info platforms/ios/build/device/libCordova.a
ionic build ios --release --device
/usr/bin/codesign --display platforms/ios/build/device/appname.app
/usr/bin/codesign --verify platforms/ios/build/device/appname.app
Lipo -info platforms/ios/build/device/libCordova.a
xcrun -sdk iphoneos PackageApplication -v platforms/ios/build/device/appname.app -o deployments/appname.ipa
/usr/bin/codesign --display platforms/ios/build/device/appname.app
/usr/bin/codesign --verify platforms/ios/build/device/appname.app
rm -rf www/dist