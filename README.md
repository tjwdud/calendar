## React Monthly/Weekly Calendar
 월/주 별로 일정을 관리할 수 있는 웹 어플리케이션

## Table of contents
* [Technologies](#technologies)
* [How to use](#how-to-use)
* [Setup](#setup)
* [Cloud Firestore Data model](#cloud-firestore-data-model)
* [Dependencies](#dependencies)

## Technologies
```
react, react-hooks, sass, firestore
```
## How to use
#### :heavy_check_mark:매주 동알허개 진행되는 고정 수업 시간표 
#### :heavy_check_mark:수업 등q록, 삭제, 수정이 가능함
#### :heavy_minus_sign:본 수업시간표 
#### :heavy_minus_sign:자유롭게 스스로 공부하는 자유수업시간표
<img src="https://user-images.githubusercontent.com/33392925/130318646-52da034b-db9a-41ae-80e8-6b03e16767bb.gif" width="850">

#### :heavy_check_mark:매주 동일하게 진행되는 시간표가 있지만 학생 출석여부, 수업휴강, 수업시간 변경 등의 이유로 달라질 수 있음
#### :heavy_check_mark:시간표 불러오기 버튼을 통해 고정시간표를 가져온다.(주별로 수업 관리)
<img src="https://user-images.githubusercontent.com/33392925/130318798-2ba3cb60-9b9f-4ece-abe4-9f09ecc9d1dc.gif" width="850">
#### :heavy_check_mark:날짜를 클릭하면 오늘 날짜로 이동
<img src="https://user-images.githubusercontent.com/33392925/130318810-48a047e4-5b2c-4d78-a7ad-c81aacb80eed.gif" width="850">
#### :heavy_check_mark:셀을 드래그하여 수업 날짜 및 시간 변경
<img src="https://user-images.githubusercontent.com/33392925/130318825-fd6ef0f1-b8c8-4257-a9e5-91a387caf49e.gif" width="850">
#### :heavy_check_mark:관리자 계정이 아닐경우 읽기만 가능
<img src="https://user-images.githubusercontent.com/33392925/130062701-4ed7b944-889b-41d3-b2db-d3f3950a656e.gif" width="850">

## Setup
#### :heavy_check_mark:
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
|dependencies|version|
|--—|—--|
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
---|--—
webpack-cli|^4.7.2


