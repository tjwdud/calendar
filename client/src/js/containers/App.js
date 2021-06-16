import React, { useState, useEffect } from 'react';
import 'sass/app.css';

import { useUserData } from 'js/stores/userData';
import { useFreeUserData } from 'js/stores/freeUserData';
import { useStudentsData } from 'js/stores/studentsData';
import { useTimeTableData } from 'js/stores/timeTableData';
import firebase from 'firebase/app'
import { dbService, arrayService,timeService } from "../../fbase";

import AppRouter from 'js/containers/components/AppRouter';


//import fbase from "fbase"
import { authService } from "fbase";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { convertLegacyProps } from 'antd/lib/button/button';


const App = () => {
	//const auth = fbase.auth();
	//console.log(auth.currentUser);
	const [init, setInit] = useState(false);
	const [userData, setUserData] = useUserData();
	const [freeUserData, setFreeUserData] = useFreeUserData();
	const [studentsData, setStudentsData] = useStudentsData();
	const [timeTableData, setTimeTableData] = useTimeTableData();
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);




	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});

		loadUserData();
		loadFreeUserData();
		loadStudentsData();
		loadTimeTableData();
	}, []);

	useEffect(
		() => {
			saveUserData();
		},
		[userData]
	);

	useEffect(
		() => {
			saveFreeUserData();
		},
		[freeUserData]
	);

	useEffect(
		() => {
			saveStudentsData();
		},
		[studentsData]
	);

	useEffect(
		() => {
			saveTimeTableData();
		},
		[timeTableData]
	);



	const saveUserData = async () => {
	
		await dbService.collection('schedule').doc('schedule').set({
			schedule:
				arrayService.arrayUnion(...userData.schedule)
		});
	};

	const saveFreeUserData =  async () => {
	
		await dbService.collection('freeSchedule').doc('freeSchedule').set({
			freeSchedule:
				arrayService.arrayUnion(...freeUserData.freeSchedule)
		});
	};

	const saveStudentsData = async () => {
	
		await dbService.collection('students').doc('students').set({
			students:
				arrayService.arrayUnion(...studentsData.students)
		});
	};

	const saveTimeTableData = async () => {
	
		await dbService.collection('timeTableSchedule').doc('timeTableSchedule').set({
			timeTableSchedule:
				arrayService.arrayUnion(...timeTableData.timeTableSchedule)
		});
		console.log('save')
		console.log(timeTableData);
	};



	const loadUserData = async () => {//값 불러올 때 string을 object로 변환
		await dbService.collection('schedule').doc('schedule').get().then((doc) => {
			if (!doc.exists) return; 
			setUserData({
					...userData,
					schedule: doc.data().schedule.map((a) => {
						return { ...a, curDate: a.curDate.toDate() };
					})
				})
			

		})
	};


	const loadFreeUserData = async () => {//값 불러올 때 string을 object로 변환
		await dbService.collection('freeSchedule').doc('freeSchedule').get().then((doc) => {
			if (!doc.exists) return; 
	
				setFreeUserData({
					...freeUserData,
					freeSchedule: doc.data().freeSchedule.map((a) => {
						return { ...a, curDate: a.curDate.toDate() };
					})
				})
			

		})
	};

	const loadStudentsData = async () => {
		await dbService.collection('students').doc('students').get().then((doc) => {
			if (!doc.exists) return; 
	
				setStudentsData({
					...studentsData,
					students: doc.data().students.map((a) => {
						return { ...a };
					})
				})
			

		})

	};

	const loadTimeTableData = async () => {
		await dbService.collection('timeTableSchedule').doc('timeTableSchedule').get().then((doc) => {
			if (!doc.exists) return; 

			setTimeTableData({
					...timeTableData,
					timeTableSchedule: doc.data().timeTableSchedule.map((a) => {
						
						return { ...a, curDate: a.curDate.toDate() };
					})
				})
				
			

		})

	};



	return (
		<>
			{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
		</>

	);
};



export default App;
