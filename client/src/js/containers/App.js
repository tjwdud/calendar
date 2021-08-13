import React, { useState, useEffect } from 'react';
import 'sass/app.css';


import AppRouter from 'js/containers/components/AppRouter';
import { authService } from "fbase";

const App = () => {

	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
	const [userObj, setUserObj] = useState(null);
	useEffect(() => {
	
		try {
			authService.onAuthStateChanged((user) => {
				if (user) {
					setUserObj(user.uid);
					setIsLoggedIn(true);
	
				} else {
					setIsLoggedIn(false);
				}
				setInit(true);

			});
		} catch (error) {
			alert(error.message);
		}

	}, []);

	return (
		<>
			{init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
		</>

	);
};



export default App;