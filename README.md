# react-nd-udaci-cards
The UdaciCards project is a mobile application (Android or iOS - or both) that allows users to study collections of flashcards.  The app is built using React-Native. The app allows users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

# Android build on expo:
https://expo.io/@angademigod666/mobile-flashcards/builds

### mobile-flashcards - IIIrd Project ReactND - ANGAD BINDRA

This is the last and final assessment project for Udacity's React-Native course and ReactND.

## This app uses AsyncStorage as backend
## Uses REdux to manage data
## Asks for Notification reminders

To get the app running right away:
* install all project dependencies with `npm install`
* start the development server with `npm start`
## NOTE: 1. It is recommend to use the `expo start` command instead of `npm start`
##       2. a) Run on android emulator 
##              OR
##       2. b) Scan the QR code on the browser, through the 'Expo' android app and enjoy

## APP BUILD: ANDROID --> exp build:android
## Testing platform: ANDROID


## What You're Getting
```bash
├── README.md -             # This file.
├── .gitignore -            # ignores node_modules
├── .watchmanconfig.js -    # Config files
├── App.js -                # App root
├── app.json -              # App configuration for build and play store publishing
├── babel.config.js -       # Config files
├── package.json -          # npm package manager file. It's unlikely that you'll need to modify this.
|
├── .expo
│       ├── favicon.ico     # React Icon, You may change if you wish.
│       └── index.html      # DO NOT MODIFY
|
├── assets
│       ├── favicon.ico     # React Icon, You may change if you wish.
│       └── index.html      # DO NOT MODIFY
|
└── src
	├── actions
    |		└── index.js
    |
    ├── assets
    |		├── fonts
    |       |     └── SpaceMono-Regular.ttf 
    |       |
    |		└── images
    |        	  ├── icon.png
    |             ├── robot-dev.png
    |             ├── robot-prod.png
    |             └── splash.png
    |
    ├── components
    |		├── CardFrontBack.js
    |		├── DeckComponent.js
    |		├── TabBarIcon.js
    |		└── TextButton.js
    |
    ├── navigation
    |		├── AppNavigator.js
    |		└── MainTabNavigator.js
    |
    |
    ├── reducers
    |		└── index.js
    |
    ├── screens
    |		├── AddCardScreen.js
    |		├── AddDeckScreen.js
    |		├── DeckDetailScreen.js
    |		├── DecksScreen.js
    |		└── QuizScreen.js
    |
	└── utils
			├── colors.js
			├── helpers.js
    		└── UdaciCardsApi.js


```

## Backend Server present inside src/utils/_DATA_WYR.js and src/utils/api.js 

A backend server is present for the app. 

The file [`./src/utils/UdaciCardsApi.js`] 
contains the methods we will need to perform necessary operations on the backend:

* [`getDecksFromAPI`](# gets the decks )
* [`getDeckDetails`](# gets a single selected deck )
* [`addCardToDeck`](# adds a card to a given deck )
* [`saveDeckTitle`](# creates a new deck )



This project was bootstrapped with [Create React Native App] --> 
## create-react-native-app

## Available Scripts

In the project directory, you can run:

### `expo start`

Runs the app in the development mode.<br>
Open [http://localhost:19001](http://localhost:) to view BUNDLER in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `exp build:android`

Builds the app for sharing on app store.<br>
Your app is ready to be deployed!
