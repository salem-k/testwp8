#!/bin/bash
PROJECT_NAME=Buzcard
SCHEME_NAME=Buzcard
STARTTIME=$(date +%s);

set -e
set -x

### Install dependencies
echo "--- Install dependencies [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

#/usr/local/bin/npm install -g
#/usr/local/bin/bower install -g

### Restore ionic platforms
echo "--- Restore ionic platforms [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

#/usr/local/bin/ionic state restore

### Build
echo "--- Build [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

#/usr/local/bin/gulp sass
#/usr/local/bin/gulp build

### Moving to ios build directory
echo "--- Moving to ios build directory [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

cd platforms/ios

### Cleaning Xcode
echo "--- Cleaning Xcode [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

#/usr/bin/xcodebuild clean      \
#    -project $PROJECT_NAME.xcodeproj  \
#    -configuration Release     \
#    -alltargets

### Archiving
echo "--- Archiving [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

#/usr/bin/xcodebuild archive -project Buzcard.xcodeproj -scheme Buzcard -archivePath Buzcard
/usr/bin/xcodebuild archive           \
    -project $PROJECT_NAME.xcodeproj  \
    -scheme $SCHEME_NAME              \
    -archivePath $PROJECT_NAME

### Uploading to Hockeyapp
echo "--- Uploading to Hockeyapp [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

#/usr/local/bin/puck
#    -notes_path=../../RELEASE_NOTES.md   \
#    -notes_type=markdown                 \
#    -submit=auto                         \
#    -download=true                       \
#    -mandatory=true                      \
#    -notify=true                         \
#    -force=true                          \
#    $PROJECT_NAME.xcarchive

ionic build ios --release --device 
/usr/bin/xcrun -sdk iphoneos PackageApplication -v "build/emulator/Buzcard.app" -o "build/emulator/Buzcard.ipa" --sign HLHJY65UAH --embed "/Users/salemk/Desktop/buzcard_appstore_profile.mobileprovision"
    
### Summary
echo "-- Total time $(($(date +%s) - $STARTTIME))s"