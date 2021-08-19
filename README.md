## React Monthly/Weekly Calendar
 월/주 별로 일정을 관리할 수 있는 웹 어플리케이션

## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)
* [Cloud Firestore Data model](#cloud-firestore-data-model)
* [Dependencies](#dependencies)

## Technologies
```
react, react-hooks, sass, firestore
```

## Setup
#### frontend
```
cd client
npm install
npm start
```
#### Firestore 
* https://firebase.google.com/docs/web/setup
* Add a web app from Firebase first.
* Add Firebase SDKs to your app.
Create firebase.js in src folder and `npm install firebase`
* Create an `.env` file in the root folder
* write `.env` in the `.gitignore`

```
//.env
React_APP_API_KEY=~~

React_APP_AUTH_DOMAIN=~~

React_APP_DATABASE_URL=~~

React_APP_PROJECT_ID=~~

React_APP_STORAGE_BUCKET=~~

React_APP_MESSAGIN_ID=~~

React_APP_APP_ID=~
```
* To use the Authentication function in the firebase, you must open the url below and set it up the same way.
https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#persistence_1

## Cloud Firestore Data model
In Cloud Firestore, the unit of storage is the document.

- schedule :
    - title:
    - curDate:
    - startHour:
    - startMinute:
    - endHour:
    - endMinute:
    - students:
        - id:
        - studentName:
        - studentAge: 

## Dependencies
dependencies|version
---|---
antd | ^6.0.0
fortawesome| ^1.2.35
fortawesome/free-solid-svg-icons|^5.15.3
fortawesome/react-fontawesome|^0.1.14
material-ui/core|^4.11.4
material-ui/lab|^4.0.0-alpha.58
cookie|^0.4.1
firebase-tools|^9.13.1
react|16.8.4
react-datepicker|^2.2.0
react-dom|16.8.4
react-router-dom|^5.2.0
react-scripts|2.1.8
uuid|^8.3.2

dev-dependenceies|version
---|---
webpack-cli|^4.7.2

![ezgif com-gif-maker](https://user-images.githubusercontent.com/33392925/130058089-d723c236-7b08-40c8-93f0-4e332b73a5fe.gif)

