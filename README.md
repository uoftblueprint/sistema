# Sistema

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

Sistema Toronto provides musical and intellectual opportunities to children in vulnerable communities, with the goal of transformative social change. They build stronger communities by enabling children from marginalized neighbourhoods to overcome poverty, grow, and thrive as engaged citizens and future leaders. They are collaborating with us this year to create a mobile application that will help with their mission.

You can learn more about their organization here: https://www.sistema-toronto.ca/

## For Developers

The [wiki](https://github.com/uoftblueprint/sistema/wiki) has a lot of relevant information related to branching, PRs, etc that you should review!

# Table of Contents
- [Sistema](#sistema)
  - [For Developers](#for-developers)
- [Table of Contents](#table-of-contents)
- [Setup Local Environment (Mac)](#setup-local-environment-mac)
- [Setup Local Environment (Windows/Linux)](#setup-local-environment-windowslinux)
  - [Windows](#windows)
  - [Linux](#linux)
- [Contributors](#contributors)

<a name="setup-mac"></a>
# Setup Local Environment (Mac)

Prerequisites:

Ensure you have the following prerequisites before trying to run the project locally:
- Node.js and npm (https://nodejs.org/en/download/). Alternatively, check if you have this by using command ```node -v``` in your terminal console. It is recommended to install Node.js using [Homebrew](https://brew.sh/) via the ```brew install node``` command. Easy, right?
- For **Mac**, make sure you install Watchman for file management: ```brew install watchman```
- You will need an iOS simulator and an Android simulator.
    1. Install [Xcode](https://apps.apple.com/ca/app/xcode/id497799835?mt=12). If your macOS version is too old to install the latest version, you can browse [this link](https://developer.apple.com/download/all/?q=xcode) to find a version that works for you, as long as it's 10 or newer.
    2. You'll need Ruby version 2.7.5 for iOS development. Use command ```ruby --version``` to check what version you're currently on. Follow the installation instructions for [rbenv](https://github.com/rbenv/rbenv)—this manages your Ruby version for different projects. Install the correct version: ```rbenv install 2.7.5```. Restart your terminal console.
    3. Install the Command Line Tools for Xcode by opening Xcode, then following Xcode > Preferences... > Locations > Command Line Tools. Choose the latest version.
    4. Install your iOS simulator by following Xcode > Preferences... > Components. Choose the simulator with the latest iOS.
    5. Okay, now we're going to install the Android simulator. Download and install [Android Studio](https://developer.android.com/studio/index.html). While going through the installation wizard, make sure "Android SDK", "Android SDK Platform", and "Android Virtual Device" are all checked.
    6. Install the Azul Zulu OpenJDK distribution: ```brew tap homebrew/cask-versions``` and ```brew install --cask zulu11```.
    7. Install the Android SDK via your fresh Android Studio app. Open it up, and select "More Actions" > "SDK Manager". From here, select the "SDK Platforms" tab, then check the box next to "Show Package Details" in the bottom right corner. Expand the "Android 12.0 (S)" entry, and check the following: ```Android SDK Platform 31``` and ```Google APIs Intel x86 Atom System Image``` (for Intel Macs) OR ```Google APIs ARM 64 v8a System Image``` (for M1 Macs).
    8. Then, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Expand the "Android SDK Build-Tools" entry, then select "31.0.0". Hit Apply. You're good to go!
    9. Configure the ANDROID_SDK_ROOT environment variable by adding the following lines to your $HOME/.bashprofile if you use bash __or__ your ~/.zprofile if you use zsh:
    ```
    export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
    export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
    ```
    10. Type ```source $HOME/.zprofile``` or ```source $HOME/.bashprofile``` to load the config. You're set!

1. Clone this repository into your local directory of choice using ```git clone https://github.com/uoftblueprint/sistema.git```
2. cd into folder sistema ```cd ./sistema```
3. Run ```npm install```
4. cd into folder mobile ```cd ./packages/mobile```
5. If using Mac, run ```rbenv local 2.7.5```
    - Run ```bundle install```
    - cd into ```cd ios```, then install pods ```pod install```
6. cd back out to sistema folder ```cd ../..```
7. Start the React Native server (Metro) by running ```yarn workspace start```. Make sure this process is complete and error-free before proceeding to the next step.
8. Start the Android simulator by running ```yarn workspace android```. Make sure your Android simulator is all set up in Android Studio!
9. Start the iOS simulator by running ```yarn workspace ios```. Make sure your iOS simnulator is all set up in Xcode!
9. The simulator should open automatically and you should see the current working version of the Sistema app.

<a name="setup-windows-linux"></a>
# Setup Local Environment (Windows/Linux)

## Windows
Unfortunately, you will have to install a [virtual machine](https://www.youtube.com/watch?v=Q55e2Tz-818) to run the iOS simulator. Since this is an incredibly [long, painful, and potentially unfruitful process](https://www.reddit.com/r/hackintosh/), we don't want to inflict this on you—so let's just install the Android simulator for now. Do what works for you!
If you choose the latter, follow [this](https://reactnative.dev/docs/environment-setup) setup tutorial via the React Native CLI until the "React Native Command Line Interface" header, then stop there.

## Linux
Again, we'll need a Mac to enable native development for iOS. Follow this [tutorial](https://www.youtube.com/watch?v=c30RLycIpVY) to install MacOS.
If you choose to only develop for Android, the Linux setup process for Android is essentially the same as that of Mac; however, since you don't have access to Homebrew, the [Node](https://nodejs.org/en/download/package-manager/), [JDK](http://openjdk.java.net/), and [Watchman](https://facebook.github.io/watchman/docs/install/#buildinstall) installations will look a little different. Just make sure to download the correct version for your Linux distribution.

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
