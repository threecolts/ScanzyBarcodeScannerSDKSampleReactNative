# ScanzyBarcodeScannerSDKSampleReactNative
react native sample to use react-native-scanzy-barcode-scanner-plugin

## Plugins

The following plugins are included:

- [react-native-scanzy-barcode-scanner-plugin](https://github.com/ScanzyLLC/react-native-scanzy-barcode-scanner-plugin)
To learn how to install react-native-scanzy-barcode-scanner-plugin and use the scan feature, check the above link.

## Development Setup 💻

### Prerequisites

- Install [Node.js](https://nodejs.org) which includes [Node Package Manager](https://www.npmjs.com/get-npm), version 14 or higher
- Android development: Install [Android Studio](https://developer.android.com/studio)
- iOS development: Install [XCode](https://apps.apple.com/de/app/xcode/id497799835?mt=12)
- ios development: Install [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
- This project uses [React Native](https://reactnative.dev/) as app development platform and the [npx].

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
npx react-native run-adnroid
```

or run the app in Xcode:
* Open the workspace file ScanzyBarcodeScannerSDKSampleReactNative.xcworkspace (not .xcodeproj) from the ios * directory in Xcode.
* Adjust Provisioning and Signing settings.
* Choose one simulator or local device to run the app.