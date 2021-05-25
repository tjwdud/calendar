import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import ControlView from 'js/containers/controlView/ControlView';
import CalendarView from 'js/containers/calendarView/CalendarView';
import AddForm from 'js/containers/components/AddForm';
import ErrorPopup from 'js/containers/components/ErrorPopup';
import { useUserData } from 'js/stores/userData';
import { useFreeUserData } from 'js/stores/freeUserData';
import StudentsControl from 'js/containers/components/StudentsControl';

const App = () => {
	const [ userData, setUserData ] = useUserData();
    const [ freeUserData, setFreeUserData ] = useFreeUserData();

	useEffect(() => {
		loadUserData();
		loadFreeUserData();
	}, []);

	useEffect(
		() => {
			saveUserData();
		},
		[ userData ]
	);

	useEffect(
		() => {
			saveFreeUserData();
		},
		[ freeUserData ]
	);

	const saveUserData = () => {
		const data = JSON.stringify(userData);//userData object를 string으로 변환
		localStorage.setItem('userData', data);
	};

   const saveFreeUserData = () => {
		const data = JSON.stringify(freeUserData);//userData object를 string으로 변환
		localStorage.setItem('freeUserData', data);
	};

	const loadUserData = () => {//값 불러올 때 string을 object로 변환
		const data = JSON.parse(localStorage.getItem('userData'));

		if (!data) return;
		setUserData({
			...userData,
			schedule: data.schedule.map((a) => {
				return { ...a, curDate: new Date(a.curDate) };
			})
		});
	};


	const loadFreeUserData = () => {//값 불러올 때 string을 object로 변환
		const data = JSON.parse(localStorage.getItem('freeUserData'));

		if (!data) return;
		setFreeUserData({
			...freeUserData,
			freeSchedule: data.freeSchedule.map((a) => {
				return { ...a, curDate: new Date(a.curDate) };
			})
		});
	};

	return (
		<div id="app">
			<ControlView />
			<CalendarView />
			<AddForm />
			<ErrorPopup />
		</div>
	);
};

export default App;
