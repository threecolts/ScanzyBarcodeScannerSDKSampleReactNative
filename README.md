# ScanzyBarcodeScannerSDKSampleReactNative
React Native sample to use react-native-scanzy-barcode-scanner-plugin

## Development Setup 💻

### Prerequisites

- Install [Node.js](https://nodejs.org) which includes [Node Package Manager](https://www.npmjs.com/get-npm), version 14 or higher
- Android development: Install [Android Studio](https://developer.android.com/studio)
- iOS development: Install [XCode](https://apps.apple.com/de/app/xcode/id497799835?mt=12)
- iOS development: Install [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
- This project uses [React Native](https://reactnative.dev/) as an app development platform and the [npx].

### Getting Started

Clone this repository:

```
git clone https://github.com/ScanzyLLC/ScanzyBarcodeScannerSDKSampleReactNative.git
```

Change to the root directory of the project:

```
cd ScanzyBarcodeScannerSDKSampleReactNative
```

Install all dependencies:

```
npm i
```
or
```
yarn
```

Install CocoaPods dependencies:

```
cd ios && pod install
```

To start Metro, run npx react-native start inside your React Native project folder:

```
npx react-native start
```

Start your application on Simulator:

```
npx react-native run-ios
npx react-native run-android
```

or run the app in Xcode:
* Open the workspace file ScanzyBarcodeScannerSDKSampleReactNative.xcworkspace (not .xcodeproj) from the ios * directory in Xcode.
* Adjust Provisioning and Signing settings.
* Choose one simulator or local device to run the app.

Android troubleshootings:
* Add the following config in the same build.gradle(Android/app/build.gradle) file to avoid conflicts with the lib filename libc++_shared.so, which is used by React Native as well as by many other 3rd-party modules:
```
android {  
    ...  
    packagingOptions {      
        pickFirst '**/libc++_shared.so'  
    }
}
```
* If there's an error like 'Unable to load script,' make sure you're either running a Metro server (run 'react-native start') or that your bundle 'index.android.bundle' is packaged correctly for release. Run the below script for each build in the root folder, and also make sure the assets folder has been created before running the script.
```
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle
``` 
