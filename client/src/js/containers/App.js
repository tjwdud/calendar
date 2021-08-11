import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import { useParams, useHistory, withRouter } from "react-router-dom";

import { useUserData } from 'js/stores/userData';
import { useFreeUserData } from 'js/stores/freeUserData';
import { useStudentsData } from 'js/stores/studentsData';
import { useTimeTableData } from 'js/stores/timeTableData';
import { useFreeTimeTableData } from 'js/stores/freeTimeTableData';

import { dbService, arrayService, timeService } from "../../fbase";

import AppRouter from 'js/containers/components/AppRouter';
import { authService } from "fbase";

const App = () => {

	const [init, setInit] = useState(false);
	/*const [userData, setUserData] = useUserData();
	const [freeUserData, setFreeUserData] = useFreeUserData();
	const [studentsData, setStudentsData] = useStudentsData();
	const [timeTableData, setTimeTableData] = useTimeTableData();
	const [freeTimeTableData, setFreeTimeTableData] = useFreeTimeTableData();*/
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
	const [userObj, setUserObj] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
	
		try {
			authService.onAuthStateChanged((user) => {
				if (user) {
					setUserObj(user.uid);
					setIsLoggedIn(true);
	
				} else {
					setIsLoggedIn(false);
					setIsAdmin(false);
				}
				setInit(true);
			});
		} catch (error) {
			alert(error.message);
		}

	}, []);

	useEffect(()=>{
		if(userObj){
			if(userObj === '111muOnAhmPBAGy80kjvZtWUuos2'){
				console.log(userObj);
				setIsAdmin(true);
				console.log('관리자');
			}
			else {
				setIsAdmin(false);
			}
		}
	},[userObj])





	return (
		<>
			{init ? <AppRouter isLoggedIn={isLoggedIn} isAdmin={isAdmin} userObj={userObj}/> : "Initializing..."}
		</>

	);
};



export default App;