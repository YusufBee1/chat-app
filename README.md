Chat App

A mobile chat application built with React Native and Expo. This app allows users to enter a chat room, customizable with a background color, and exchange messages, images, and location data.

Features

Start Screen: Users can enter their name and choose a background color.

Chat Screen: - Real-time messaging using Google Firestore.

Send images from the Camera or Photo Library (stored in Firebase Storage).

Share GPS location with a map view.

Offline compatibility (caches messages to view later).

Accessibility: Screen reader support for action buttons.

Tech Stack

React Native & Expo

Google Firestore (Database) & Firebase Storage (Media)

React Native Gifted Chat

Expo Image Picker, Location, and MapView

Installation & Running

Install dependencies:

npm install


Start the app:

npx expo start


Use the Expo Go app on your phone or an Android Emulator.

Setup Requirements

Firebase: You must provide your own firebaseConfig in App.js.

Storage: Enable Firebase Storage in your console (Test Mode) to allow image uploads.