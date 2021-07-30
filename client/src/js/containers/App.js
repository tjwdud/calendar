import React, { useState, useEffect } from 'react';
import 'sass/app.css';

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


	useEffect(() => {
		try {
			authService.onAuthStateChanged((user) => {
				if (user) {
					setIsLoggedIn(true);
				} else {
					setIsLoggedIn(false);
				}
				setInit(true);
			});
		} catch (error) {
			alert(error.message);
		}


		/*loadUserData();
		loadFreeUserData();
		loadStudentsData();
		loadTimeTableData();
		loadFreeTimeTableData();*/
	}, []);





	return (
		<>
			{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
		</>

	);
};



export default App;
