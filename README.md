Star Wars Favorites Mobile App
This mobile application, developed with React Native, is designed for both iOS and Android platforms. It allows users to track the total count of their favorite characters categorized as male/female/other across the Star Wars Universe.

Features
 Separate screens for viewing all characters and favorites.
 Detailed information displayed on a dedicated screen when a character card is clicked.
 Ability to accumulate favorites from the main list.
 Displays the total number of male/female/other characters based on user selections on the favorites screen.
 Favorites list is saved in local storage.
 Search characters by name, year of birth, gender, or home world on both the favorites and main character screens.
 Additional character data can be loaded with the "LOAD MORE" button if available.
 "CLEAR FANS" button resets all favorites and sets all total count values to zero.
Getting Started
Follow these instructions to set up and run the project locally. Ensure you have node version 16 or higher installed.


Copy code
cd ios && pod update hermes-engine --no-repo-update && cd ..
Tip: You can combine the installation and pod update commands into one line.

Using Yarn:

sh
Copy code
yarn && cd ios && pod update hermes-engine --no-repo-update && cd ..
Using NPM:

sh
Copy code
npm install && cd ios && pod update hermes-engine --no-repo-update && cd ..
Running the Project
Start the Metro server:

Using Yarn:

sh
Copy code
yarn start
Using React Native CLI:

sh
Copy code
react-native start
Run the app on Android:

Using Yarn:

sh
Copy code
yarn android
Using React Native CLI:

sh
Copy code
react-native run-android
Run the app on iOS:

Using Yarn:

sh
Copy code
yarn ios
Using React Native CLI:

sh
Copy code
react-native run-ios
