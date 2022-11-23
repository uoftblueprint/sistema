# Sistema

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Sistema Toronto provides musical and intellectual opportunities to children in vulnerable communities, with the goal of transformative social change. They build stronger communities by enabling children from marginalized neighbourhoods to overcome poverty, grow, and thrive as engaged citizens and future leaders. They are collaborating with us this year to create a mobile application that will help with their mission.

You can learn more about their organization here: https://www.sistema-toronto.ca/

## For Developers

The [wiki](https://github.com/uoftblueprint/sistema/wiki) has a lot of relevant information related to branching, PRs, etc that you should review!

# Table of Contents
- [Sistema](#sistema)
  - [For Developers](#for-developers)
- [Table of Contents](#table-of-contents)
- [Commmiting and Pushing](#commmiting-and-pushing)
- [Setup Local Environment (Mac)](#setup-local-environment-mac)
- [Setup Local Environment (Windows)](#setup-local-environment-windows)
  - [Running your React native app](#running-your-react-native-app-windows)
- [Setup Local Environment (Linux)](#setup-local-environment-linux)
- [Setting up Simulators/Virtual Devices](#setting-up-simulatorsvirtual-devices)
  - Android
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)

# Commmiting and Pushing

This repository uses [commitizen](https://www.npmjs.com/package/commitizen) (commit message generator) and [Husky](https://typicode.github.io/husky/#/) (lints and runs scripts triggered by git hooks).

1. Add your changed files with `git add` as usual or through your IDE shortcut.
1. To commit, run `yarn run cm` to start commitizen and generate a standardized commit message.
1. To push, run `git push` as usual or through your IDE shortcut.

We use Husky to lint code and run other checks when you push. To bypass hooks:

You can bypass `pre-commit` and `commit-msg` hooks using` Git -n/--no-verify` option:

```bash
git commit -m "yolo!" --no-verify
```

For Git commands that don't have a `--no-verify` option, you can use `HUSKY` environment variable:

```bash
HUSKY=0 git push # yolo!
```

# Setup Local Environment (Mac)

**Prerequisites:**

Ensure you have the following prerequisites before trying to run the project locally:
- Node.js and npm (https://nodejs.org/en/download/). Alternatively, check if you have this by using command ```node -v``` in your terminal console. It is recommended to install Node.js using [Homebrew](https://brew.sh/) via the ```brew install node``` command. Easy, right?
- For **Mac**, make sure you install Watchman for file management: ```brew install watchman```
- Install Yarn, another package manager that enables our monorepo to function: ```npm install --global yarn```
- You will need an iOS simulator and an Android simulator. Details to follow!

**Setup:**

1. Install [Xcode](https://apps.apple.com/ca/app/xcode/id497799835?mt=12). If your macOS version is too old to install the latest version, you can browse [this link](https://developer.apple.com/download/all/?q=xcode) to find a version that works for you, as long as it's 10 or newer.
2. You'll need Ruby version 2.7.5 for iOS development. Use command ```ruby --version``` to check what version you're currently on. Follow the installation instructions for [rbenv](https://github.com/rbenv/rbenv)—this manages your Ruby version for different projects. Install the correct version: ```rbenv install 2.7.5```. Restart your terminal console.
3. Install the Command Line Tools for Xcode by opening Xcode, then following Xcode > Preferences... > Locations > Command Line Tools. Choose the latest version.
4. Install your iOS simulator by following Xcode > Preferences... > Components. Choose the simulator with the latest iOS.
5. Okay, now we're going to install the Android simulator. Download and install [Android Studio](https://developer.android.com/studio/index.html). While going through the installation wizard, make sure "Android SDK", "Android SDK Platform", and "Android Virtual Device" are all checked.
6. Install the Azul Zulu OpenJDK distribution: ```brew tap homebrew/cask-versions``` and ```brew install --cask zulu11```.
7. Install the Android SDK via your fresh Android Studio app. Open it up, and select "More Actions" > "SDK Manager". From here, select the "SDK Platforms" tab, then check the box next to "Show Package Details" in the bottom right corner. Expand the "Android 12.0 (S)" entry, and check the following: ```Android SDK Platform 31``` and ```Google APIs Intel x86 Atom System Image``` (for Intel Macs) OR ```Google APIs ARM 64 v8a System Image``` (for M1 Macs).
8. Then, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Expand the "Android SDK Build-Tools" entry, then select "31.0.0". Hit Apply. You're good to go!
9. Configure the ANDROID_SDK_ROOT environment variable by adding the following lines to your $HOME/.bashprofile if you use bash __or__ your ~/.zprofile if you use zsh:\
    ```
    export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
    export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
    ```
10. Type ```source $HOME/.zprofile``` or ```source $HOME/.bashprofile``` to load the config. You're set!

## Running your React Native app (Mac)

1. Clone this repository into your local directory of choice using ```git clone https://github.com/uoftblueprint/sistema.git```
2. cd into folder sistema ```cd ./sistema```
3. Run ```npm install```
4. Run ```yarn```
5. cd into folder mobile ```cd ./packages/mobile```
6. If using Mac, run ```rbenv local 2.7.5```
    - Run ```bundle install```
    - cd into ```cd ios```, then install pods ```pod install```
7. cd back out to sistema folder ```cd ../..```
8. Start the React Native server (Metro) by running ```yarn workspace start```. Make sure this process is complete and error-free before proceeding to the next step.
9. Navigate to [Setting up Simulators/Virtual Devices](#setting-up-simulatorsvirtual-devices) and follow the steps. You can either start your simulator and run the build inside Android Studio/XCode, or you can do the follow steps:
9. Start the Android simulator by running ```yarn workspace android```. Make sure your Android simulator is all set up in Android Studio!
11. Start the iOS simulator by running ```yarn workspace ios```. Make sure your iOS simnulator is all set up in Xcode!
12. The simulator should open automatically and you should see the current working version of the Sistema app.

# Setup Local Environment (Windows)
Unfortunately, you will have to install a [virtual machine](https://www.makeuseof.com/tag/macos-windows-10-virtual-machine/) to run the iOS simulator. Since this is an incredibly [long, painful, and potentially unfruitful process](https://www.reddit.com/r/hackintosh/), we don't want to inflict this on you—so let's just install the Android simulator for now. Do what works for you!

Prerequisites:
- Node
- React Native CLI
- a JDK
- Android Studio

Setup:

1. Follow [this](https://reactnative.dev/docs/environment-setup) setup tutorial to download necessary prerequisites up until and including the "React Native Command Line Interface" header, then stop there. Even if you have the prerequisites downloaded, make sure the versions are correct.
2. From the root folder of the sistema project, run `yarn` to install packages.
3. Set up the Android simulator. Skip to [Setting up Simulators/Virtual Devices](#setting-up-simulatorsvirtual-devices) and follow the Android section. Once that's set up, you're ready to run your app!

## Running your React Native app (Windows)

Open Android Studio and start your virtual device. Run `yarn run android:start`. Give a few minutes for Metro to start, Gradle to build, and the simulator to load.

*What's Metro?* Metro is the JavaScript bundler that ships with React Native. Metro "takes in an entry file and various options, and returns a single JavaScript file that includes all your code and its dependencies."—Metro Docs. To start Metro without Android, run `yarn run android:metro` inside the root folder.

To start Android studio and the emulator without your app, run `yarn run android:studio`.

# Setup Local Environment (Linux)

Again, we'll need a Mac to enable native development for iOS. Follow this [tutorial](https://www.youtube.com/watch?v=c30RLycIpVY) to install MacOS.
If you choose to only develop for Android, the Linux setup process for Android is essentially the same as that of Mac; however, since you don't have access to Homebrew, the [Node](https://nodejs.org/en/download/package-manager/), [JDK](http://openjdk.java.net/), and [Watchman](https://facebook.github.io/watchman/docs/install/#buildinstall) installations will look a little different. Just make sure to download the correct version for your Linux distribution.

# Setting up Simulators/Virtual Devices

## Android

1. Open `./sistema/packages/mobile/android` inside Android Studio. If it's your first time opening up the project, Android Studio will automatically start the build. _Make sure the gradle build is successful._ Check [Troubleshooting](#troubleshooting) for common errors.
1. Next, we're going to create the AVD (Android Virtual Device). Click on Device Manager in the top right tool bar (next to gradle build). If you have recently installed Android Studio, you will likely need to create a new AVD. Select Virtual > Create Device.
1. Pick the Pixel 6 Pro or any other modern phone and from the list and click "Next". Then select the system image: x86 Images > S (API Level = 31, Target = Android 12.0). Click "Next" then "Finish" to create your AVD.
1. At this point you should be able to click on the green triangle button next to your AVD to launch it. It might take a few minutes for the Emulator to start.
1. Run your React Native app.

# Troubleshooting

## The development server returned response error code: 500 in react native (Android Simulator Error)

**Error:**
When you try to run your build on your Android simulator, and the simulator returns an error 500.

**Solution:**
It's possible that it's a port problem. Try running this command in your terminal:
```
adb reverse tcp:8081 tcp:8082
```

## `cli-platform-android` doesn't exist (Android)

**Error:**

```
Settings file 'C:\%LOCALPATH%\sistema\packages\mobile\android\settings.gradle' line: 2

A problem occurred evaluating settings 'sistema'.
> Could not read script 'C:\Users\%LOCALPATH%\sistema\packages\mobile\node_modules\@react-native-community\cli-platform-android\native_modules.gradle' as it does not exist.
```

**Solution:**

```
yarn add @react-native-community/cli-platform-android
```

## 'adb' is not recognized (Android)

**Error:**

```
info Starting the app...
'adb' is not recognized as an internal or external command,
operable program or batch file.                            
error Failed to start the app.
Error: Command failed: adb shell am start -n com.sistema/com.sistema.MainActivity
```

**Solution (Windows only):**

1. Type in "env" in your Windows search bar. System Properties > Environment Variables. Make sure that `%LOCALAPPDATA%\Android\Sdk\platform-tools` is in your PATH system variables. Replace "%LOCALAPPDATA%" with your local app data path.
2. Open a new terminal and confirm with the `$Env:Path` command that platform-tools is in the variable. You might have to restart your IDE.

## Can't find package (Android)

**Error:**

```
error Failed to install the app. Make sure you have the Android development environment set up: https://reactnative.dev/docs/environment-setup.
Error: Command failed: gradlew.bat app:installDebug -PreactNativeDevServerPort=8081
Unable to install C:\%LOCALAPPDATA%\sistema\packages\mobile\android\app\build\outputs\apk\debug\app-debug.apk
com.android.ddmlib.InstallException: Unknown failure: cmd: Can't find service: package
```

**Solution:**

Open Android Studio > Device Manager. Run "Cold Boot Now" on the specific emulator to get it back up.

## Hermes or undefined error (Android)

**Error:**

```
TypeError: Cannot read property 'now' of undefined
...
I/HermesVM: JSI rethrowing JS exception: Cannot read property 'now' of undefined
...
E/unknown:ReactNative: Exception in native call
    java.lang.RuntimeException: Attempting to call JS function on a bad application bundle: HMRClient.setup()
...
E/unknown:DeviceInfo: Unhandled SoftException
    com.facebook.react.bridge.ReactNoCrashSoftException: No active CatalystInstance, cannot emitUpdateDimensionsEvent
```

**Solution:**
From the root folder:

```powershell
cd ./packages/mobile/android/
./gradlew clean
```

# Contributors:

1. Emily Yu
2. Ramy Zhang
3. Azamat Khamidov
4. Baker Jackson
5. Harmit Goswami
6. Helena Glowacki
7. Kurtis Law
8. Min Gi
9. Sarah Xu
